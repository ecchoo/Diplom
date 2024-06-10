const { StatusCodes } = require("http-status-codes");
const questionRepository = require('../repositories/QuestionRepository');
const { validationResult } = require('express-validator');

class QuestionController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req);
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() });
            }

            const { questionText, testId } = req.body;
            const newQuestion = await questionRepository.create({ questionText, testId });

            return res.status(StatusCodes.CREATED).json({ newQuestion });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const errorsValidation = validationResult(req);
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() });
            }

            const { id, questionText, testId } = req.body;
            const updatedQuestion = await questionRepository.update({ id, questionText, testId });

            return res.status(StatusCodes.OK).json({ updatedQuestion });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { query: { id } } = req;
            const deletedQuestion = await questionRepository.delete(id);

            return res.status(StatusCodes.NO_CONTENT).json({ deletedQuestion });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }
}

module.exports = new QuestionController();
