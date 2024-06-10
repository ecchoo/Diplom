const { Router } = require('express')
const dashboardController = require('../controllers/DashboardController')
const authenticateUser = require('../middleware/User/AuthMiddleware')
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware')
const { getUserCourseList } = require('../requests/Course/getCourseList')
const { ROLES } = require('../constants/roles')

const dashboardRouter = Router()
dashboardRouter.use(authenticateUser)

dashboardRouter.get('/user-course-list', checkRoleMiddleware([ROLES.STUDENT]), getUserCourseList(), dashboardController.getUserCourseList)
dashboardRouter.get('/user-course-list/:id', checkRoleMiddleware([ROLES.STUDENT]), dashboardController.getUserCourse)
dashboardRouter.get('/teacher-course-list', checkRoleMiddleware([ROLES.TEACHER]), dashboardController.getTeacherCourseList)
dashboardRouter.get('/chat-list', dashboardController.getChatList)
dashboardRouter.get('/teacher-course-list/:id', checkRoleMiddleware([ROLES.TEACHER]), dashboardController.getTeacherCourse)


module.exports = dashboardRouter