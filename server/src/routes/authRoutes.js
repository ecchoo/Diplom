const express = require('express')
const { registerStudent } = require('../requests/Auth/registerStudent')
const { login } = require('../requests/Auth/login')
const authController = require('../controllers/AuthController')
const { registerTeacher } = require('../requests/Auth/registerTeacher')

const authRouter = express.Router()

authRouter.post('/register-student', registerStudent(), authController.registerStudent)
authRouter.post('/register-teacher', registerTeacher(), authController.registerTeacher)
authRouter.post('/login', login(), authController.login)
authRouter.post('/verify-email', authController.verifyEmail)
authRouter.post('/reset-password', authController.resetPassword)

authRouter.post('/google', authController.authWithGoogle)
authRouter.post('/github', authController.authWithGitHub)


module.exports = authRouter