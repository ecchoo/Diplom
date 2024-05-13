const express = require('express')
const courseController = require('../controllers/CourseController')
const authenticateUser = require('../middleware/User/AuthMiddleware')

const courseRouter = express.Router()

courseRouter.get('/list', courseController.list)
courseRouter.get('/:id', courseController.index)
courseRouter.post('/create', courseController.create)
courseRouter.put('/update', courseController.update)
courseRouter.delete('/delete', courseController.delete)
courseRouter.post('/enroll', authenticateUser, courseController.enroll)


module.exports = courseRouter