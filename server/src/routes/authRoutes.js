const express = require('express')
const { registerValidation } = require('../requests/Auth/RegisterRequest')
const { loginValidation } = require('../requests/Auth/LoginRequest')
const authController = require('../controllers/AuthController')
const UserRepository = require('../repositories/UserRepository')

const authRouter = express.Router()

authRouter.post('/register', registerValidation(), authController.register)
authRouter.post('/login', loginValidation(), authController.login)
authRouter.post('/verify-email', authController.verifyEmail)
authRouter.post('/reset-password', authController.resetPassword)

authRouter.post('/google', authController.authWithGoogle)
authRouter.post('/github', authController.authWithGitHub)
authRouter.get('/moderators', async (req, res) => {
    const moderators = await UserRepository.getModerators()

    return res.json(moderators)
})

module.exports = authRouter