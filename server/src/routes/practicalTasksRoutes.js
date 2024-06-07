const express = require('express')
const practicalTasksController = require('../controllers/PracticalTaskController')
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware')
const { createUpdate } = require('../requests/PracticalTask/createUpdate')
const { ROLES } = require('../constants/roles')
const authenticateUser = require('../middleware/User/AuthMiddleware')

const practicalTasksRouter = express.Router()
practicalTasksRouter.use(authenticateUser)

practicalTasksRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), practicalTasksController.create)
practicalTasksRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), practicalTasksController.update)
practicalTasksRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), practicalTasksController.delete)
practicalTasksRouter.post('/submit', checkRoleMiddleware([ROLES.STUDENT]), practicalTasksController.submit)
practicalTasksRouter.get('/user-practical-tasks', practicalTasksController.getUserPracticalTasks)

module.exports = practicalTasksRouter