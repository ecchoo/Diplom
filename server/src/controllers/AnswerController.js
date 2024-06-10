const { StatusCodes } = require("http-status-codes");
const answerRepository = require('../repositories/AnswerRepository');
const { validationResult } = require('express-validator');

class AnswerController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req);
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() });
            }

            const { questionId, answerText, isCorrect } = req.body;
            const newAnswer = await answerRepository.create({ questionId, answerText, isCorrect });

            return res.status(StatusCodes.CREATED).json({ newAnswer });
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

            const { id, questionId, answerText, isCorrect } = req.body;
            const updatedAnswer = await answerRepository.update({ id, questionId, answerText, isCorrect });

            return res.status(StatusCodes.OK).json({ updatedAnswer });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { query: { id } } = req;
            const deletedAnswer = await answerRepository.delete(id);

            return res.status(StatusCodes.NO_CONTENT).json({ deletedAnswer });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }
}

module.exports = new AnswerController();
