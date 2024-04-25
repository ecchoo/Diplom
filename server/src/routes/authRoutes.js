const express = require('express')
const { registerValidation } = require('../requests/Auth/RegisterRequest')
const { loginValidation } = require('../requests/Auth/LoginRequest')
const authController = require('../controllers/AuthController')

const authRouter = express.Router()

authRouter.post('/register', registerValidation(), authController.register)
authRouter.post('/login', loginValidation(), authController.login)


module.exports = authRouter