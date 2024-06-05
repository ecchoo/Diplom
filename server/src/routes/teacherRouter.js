const express = require('express')
const teacherController = require('../controllers/TeacherController')
const authenticateUser = require('../middleware/User/AuthMiddleware')

const teacherRouter = express.Router()
teacherRouter.use(authenticateUser)

teacherRouter.get('/list', teacherController.list)


module.exports = teacherRouter