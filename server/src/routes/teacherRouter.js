const express = require('express')
const teacherController = require('../controllers/teacherController')

const teacherRouter = express.Router()

teacherRouter.get('/list', teacherController.list)


module.exports = teacherRouter