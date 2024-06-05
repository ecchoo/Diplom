const express = require('express')
const partitionController = require('../controllers/PartitionController')
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware')
const { createUpdate } = require('../requests/Partition/createUpdate')
const { ROLES } = require('../constants/roles')

const partitionsRouter = express.Router()

partitionsRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), partitionController.create)
partitionsRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), partitionController.update)
partitionsRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), partitionController.delete)

module.exports = partitionsRouter