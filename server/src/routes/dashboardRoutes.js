const { Router } = require('express')
const dashboardController = require('../controllers/DashboardController')
const authenticateUser = require('../middleware/User/AuthMiddleware')
const { getCourseList } = require('../requests/dashboard/getCourseList')

const dashboardRouter = Router()
dashboardRouter.use(authenticateUser)

dashboardRouter.get('/course-list', getCourseList(), dashboardController.courseList)
dashboardRouter.get('/chat-list', dashboardController.chatList)

module.exports = dashboardRouter