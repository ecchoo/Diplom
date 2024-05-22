const express = require('express')
const { registerValidation } = require('../requests/Auth/RegisterRequest')
const { loginValidation } = require('../requests/auth/LoginRequest')
const authController = require('../controllers/AuthController')

const authRouter = express.Router()

authRouter.post('/register', registerValidation(), authController.register)
authRouter.post('/login', loginValidation(), authController.login)
authRouter.post('/verify-email', authController.verifyEmail)
authRouter.post('/reset-password', authController.resetPassword)
authRouter.post('/google', authController.authWithGoogle)

module.exports = authRouter