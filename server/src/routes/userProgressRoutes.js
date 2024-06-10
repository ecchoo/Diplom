const express = require('express')
const userProgressController = require('../controllers/UserProgressController')
const authenticateUser = require('../middleware/User/AuthMiddleware')
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware')
const { ROLES } = require('../constants/roles')

const userProgressRouter = express.Router()

userProgressRouter.put('/update', authenticateUser, checkRoleMiddleware([ROLES.STUDENT]), userProgressController.update)

module.exports = userProgressRouter