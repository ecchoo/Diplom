const express = require('express');
const testController = require('../controllers/TestController');
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware');
const { createUpdate } = require('../requests/Test/createUpdate');
const { ROLES } = require('../constants/roles');
const authenticateUser = require('../middleware/User/AuthMiddleware')


const testsRouter = express.Router();
testsRouter.use(authenticateUser)

testsRouter.get('/:id', testController.index)
testsRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), testController.create);
testsRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), testController.update);
testsRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), testController.delete);
testsRouter.post('/submit', testController.submit)

module.exports = testsRouter;
