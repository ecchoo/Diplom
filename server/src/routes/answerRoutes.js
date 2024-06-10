const express = require('express');
const answerController = require('../controllers/AnswerController');
const checkRoleMiddleware = require('../middleware/User/CheckRoleMiddleware');
const { createUpdate } = require('../requests/Answer/createUpdate');
const { ROLES } = require('../constants/roles');

const answersRouter = express.Router();

answersRouter.post('/create', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), answerController.create);
answersRouter.put('/update', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), createUpdate(), answerController.update);
answersRouter.delete('/delete', checkRoleMiddleware([ROLES.TEACHER, ROLES.ADMIN]), answerController.delete);

module.exports = answersRouter;
