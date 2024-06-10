const express = require('express');
const questionController = require('../controllers/QuestionController');
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware');
const { createUpdate } = require('../requests/Question/createUpdate');
const { ROLES } = require('../constants/roles');

const questionRouter = express.Router();

questionRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), questionController.create);
questionRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), questionController.update);
questionRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), questionController.delete);

module.exports = questionRouter;
