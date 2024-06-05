const express = require('express')
const leassonController = require('../controllers/LeassonController')
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware')
const { createUpdate } = require('../requests/Leasson/createUpdate')
const { ROLES } = require('../constants/roles')

const leassonsRouter = express.Router()

leassonsRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), leassonController.create)
leassonsRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), leassonController.update)
leassonsRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), leassonController.delete)

module.exports = leassonsRouter