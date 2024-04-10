const { Router } = require('express')
const userController = require('../controllers/UserController')
const authenticateUser = require('../middleware/User/AuthMiddleware')

const userRouter = Router()
userRouter.use(authenticateUser)

userRouter.post('/add-course', userController.addCourse)

module.exports = userRouter