const { StatusCodes } = require('http-status-codes')
const authService = require('../services/AuthService')
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
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

            res.status(StatusCodes.CREATED).json({ ...user.dataValues, token })
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
            const user = authService.loginUser({ password, email })

            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid data' })
            }

            const payload = {
                id: user.id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.status(StatusCodes.OK).json({ ...user.dataValues, token })
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }
}

module.exports = new AuthController()