const { StatusCodes } = require("http-status-codes");
const practicalTasksRepository = require('../repositories/PracticalTaskRepository')
const { validationResult } = require('express-validator')

class PracticalTaskController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { condition, leassonId } = req.body
            const newPracticalTask = await practicalTasksRepository.create({ condition, leassonId })

            return res.status(StatusCodes.CREATED).json({ newPracticalTask })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async update(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { id, condition, leassonId } = req.body
            const updatedPracticalTask = await practicalTasksRepository.update({ id, condition, leassonId })

            return res.status(StatusCodes.CREATED).json({ updatedPracticalTask })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async delete(req, res) {
        try {
            const { query: { id } } = req
            const deletedPracticalTask = await practicalTasksRepository.delete(id)

            return res.status(StatusCodes.NO_CONTENT).json({ deletedPracticalTask })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async submit(req, res) {
        try {
            const { userId, body: { filePath, practicalTaskId } } = req
            const userPracticalTask = await practicalTasksRepository.createUserPracticalTask({ filePath, userId, practicalTaskId })

            return res.status(StatusCodes.CREATED).json({ userPracticalTask })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async getUserPracticalTasks(req, res) {
        try {
            const userPracticalTasks = await practicalTasksRepository.getUserPracticalTasks(req.userId)

            return res.status(StatusCodes.CREATED).json({ userPracticalTasks })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new PracticalTaskController();
