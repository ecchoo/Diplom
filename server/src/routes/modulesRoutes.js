const express = require('express')
const moduleController = require('../controllers/ModuleController')
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware')
const { createUpdate } = require('../requests/Module/createUpdate')
const { ROLES } = require('../constants/roles')

const modulesRouter = express.Router()

modulesRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), moduleController.create)
modulesRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), moduleController.update)
modulesRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), moduleController.delete)

module.exports = modulesRouter