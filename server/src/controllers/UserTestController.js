const { StatusCodes } = require("http-status-codes");
const userTestRepository = require('../repositories/UserTestRepository');
const { validationResult } = require('express-validator');

class UserTestController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req);
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() });
            }

            const { userId, testId } = req.body;
            // Здесь необходимо обработать ответы пользователя и создать записи в таблице user_answers
            // Например:
            // const userAnswers = req.body.userAnswers;
            // for (const userAnswer of userAnswers) {
            //     await userAnswerRepository.create({ userId, testId, ...userAnswer });
            // }
            // После создания ответов можно создать запись о пользовательском тесте
            const newUserTest = await userTestRepository.create({ userId, testId });

            return res.status(StatusCodes.CREATED).json({ newUserTest });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }
}

module.exports = new UserTestController();
