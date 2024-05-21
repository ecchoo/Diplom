const { StatusCodes } = require('http-status-codes')
const authService = require('../services/AuthService')
const mailService = require('../services/MailService')
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const userRepository = require('../repositories/UserRepository')
dotenv.config()

class AuthController {
    async register(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { name, password, email } = req.body
            const user = await authService.registerUser({ name, password, email })

            const payload = {
                id: user.id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

            mailService.sendMessage({
                from: 'kosmat3936@gmail.com',
                to: email,
                subject: 'Верификация почты',
                text: `http://localhost:5173/verify-email?token=${token}`
            })

            res.status(StatusCodes.CREATED).json({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                token,
            })
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async login(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { password, email } = req.body
            const user = await authService.loginUser({ password, email })

            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid data' })
            }

            const payload = {
                id: user.id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.status(StatusCodes.OK).json({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                token
            })
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async verifyEmail(req, res) {
        try {
            const { body: { token, email } } = req
            const { id } = jwt.verify(token, process.env.JWT_SECRET)

            const { email: userEmail, verified } = (await userRepository.getById(id)).toJSON()

            if (verified) {
                return res.status(StatusCodes.OK).json({ message: 'Email уже верифицирован' })
            }

            if (userEmail === email) {
                await userRepository.verify(id)
                return res.status(StatusCodes.OK).json({ message: 'Email успешно верифицирован' })
            }

            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email не был верифицирован' })

        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }
}

module.exports = new AuthController()