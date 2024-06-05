const express = require('express')
const courseController = require('../controllers/CourseController')
const authenticateUser = require('../middleware/User/AuthMiddleware')
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware')
const { createUpdate } = require('../requests/Course/createUpdate')
const { ROLES } = require('../constants/roles')

const courseRouter = express.Router()

courseRouter.get('/list', courseController.list)
courseRouter.get('/:id', courseController.index)
courseRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), courseController.create)
courseRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), courseController.update)
courseRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), courseController.delete)
courseRouter.post('/enroll', checkRoleMiddleware([ROLES.STUDENT]), courseController.enroll)

module.exports = courseRouter