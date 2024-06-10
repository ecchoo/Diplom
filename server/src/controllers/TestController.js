const { StatusCodes } = require("http-status-codes");
const testRepository = require('../repositories/TestRepository');
const { validationResult } = require('express-validator');
const testService = require("../services/TestService");

class TestController {
    async index(req, res) {
        try {
            const { id: testId } = req.params;
            const test = await testRepository.getById(testId)

            return res.status(StatusCodes.CREATED).json({ test });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }

    async submit(req, res) {
        try {
            const { userId, body: { testId, userAnswers } } = req;
            const testResult = await testService.submit({ testId, userId, userAnswers })

            return res.status(StatusCodes.CREATED).json({ testResult });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const errorsValidation = validationResult(req);
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() });
            }

            const { name, courseId, questions } = req.body;
            const newTest = await testService.create({ name, courseId, questions });

            return res.status(StatusCodes.CREATED).json({ newTest });
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

            const { id, name, courseId, questions } = req.body;
            const updatedTest = await testService.update({ id, name, courseId, questions });

            return res.status(StatusCodes.OK).json({ updatedTest })
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { query: { id } } = req;
            const deletedTest = await testRepository.delete(id);

            return res.status(StatusCodes.NO_CONTENT).json({ deletedTest });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }
}

module.exports = new TestController();
