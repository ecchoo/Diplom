const { Router } = require('express')
const dashboardController = require('../controllers/DashboardController')
const authenticateUser = require('../middleware/User/AuthMiddleware')

const dashboardRouter = Router()
dashboardRouter.use(authenticateUser)

dashboardRouter.get('/course-list', dashboardController.courseList)
dashboardRouter.get('/chat-list', dashboardController.chatList)

module.exports = dashboardRouter