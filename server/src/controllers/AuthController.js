const { StatusCodes } = require('http-status-codes')
const authService = require('../services/AuthService')
const mailService = require('../services/MailService')
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const userRepository = require('../repositories/UserRepository')
const { URLS } = require('../constants/urls')
dotenv.config()

class AuthController {
    async registerStudent(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { name, password, email } = req.body
            const { id, role, verified, photo } = await authService.registerUser({ name, password, email })

            const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            console.log('URLS', URLS)
            mailService.sendMessage({
                from: 'kosmat3936@gmail.com',
                to: email,
                subject: 'Верификация почты',
                text: `${URLS.VERIFY_EMAIL}?token=${token}`
            })

            return res.status(StatusCodes.CREATED).json({ id, email, name, role, verified, photo, token })
        } catch (err) {
            console.log(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async registerTeacher(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { name, password, email, bio, yearsExperience } = req.body
            const { id, role, verified, photo } = await authService.registerTeacher({ name, password, email, bio, yearsExperience })

            const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            mailService.sendMessage({
                from: 'kosmat3936@gmail.com',
                to: email,
                subject: 'Верификация почты',
                text: `${URLS.VERIFY_EMAIL}?token=${token}`
            })

            return res.status(StatusCodes.CREATED).json({ id, email, name, role, verified, photo, token })
        } catch (err) {
            console.log(err)
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
            const user = await authService.login({ password, email })

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
                verified: user.verified,
                photo: user.photo,
                token
            })
        } catch (err) {
            console.log(err)
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
                await authService.verify(id)
                return res.status(StatusCodes.OK).json({ message: 'Email успешно верифицирован' })
            }

            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email не был верифицирован' })

        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async resetPassword(req, res) {
        try {
            const { body: { email } } = req

            const user = await userRepository.getByEmail(email)

            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: 'Пользователя с такой почтой не найдено'
                })
            }

            if (!user.verified) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    message: 'Аккаунт не был верифицирован, поэтому его нельзя восстановить'
                })
            }

            await authService.resetPassword({ userId: user.id, email: user.email })

            return res.status(StatusCodes.OK).json({
                message: 'Письмо с новым паролем было отправлено на вашу почту'
            })
        } catch (err) {
            console.log(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async authWithGoogle(req, res) {
        try {
            const { body: { credential } } = req
            const { email, name: googleName, picture } = jwt.decode(credential)

            const { id, name, role, photo, verified } = await authService.authWithGoogle({
                name: googleName,
                photo: picture,
                email
            })

            const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            return res.status(StatusCodes.OK).json({ id, email, role, name, photo, token, verified })
        } catch (err) {
            console.log(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async authWithGitHub(req, res) {
        try {
            const { body: { code } } = req

            const { id, name, role, photo, verified } = await authService.authWithGitHub(code)
            const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            return res.status(StatusCodes.OK).json({ id, role, name, photo, token, verified })
        } catch (err) {
            console.log(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }
}

module.exports = new AuthController()