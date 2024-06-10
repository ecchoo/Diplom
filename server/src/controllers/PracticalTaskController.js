const { StatusCodes } = require("http-status-codes");
const practicalTasksRepository = require('../repositories/PracticalTaskRepository')
const { validationResult } = require('express-validator');
const practicalTaskService = require("../services/PracticalTaskService");

class PracticalTaskController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { condition, leassonId, courseId } = req.body
            const newPracticalTask = await practicalTaskService.create({ condition, leassonId, courseId })

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
            const { query: { practicalTaskId, courseId } } = req
            const deletedPracticalTask = await practicalTaskService.delete({ practicalTaskId: Number(practicalTaskId), courseId: Number(courseId) })

            return res.status(StatusCodes.NO_CONTENT).json({ deletedPracticalTask })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async submit(req, res) {
        try {
            const { userId, body: { filePath, practicalTaskId, courseId } } = req
            const userPracticalTask = await practicalTaskService.submit({ userId, filePath, practicalTaskId, courseId })

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

    async getUserPracticalTasksTurnedInById(req, res) {
        try {
            const { id: taskId } = req.params
            const practicalTasksTurnedIn = await practicalTasksRepository.getUserPracticalTasksTurnedInById(taskId)

            return res.status(StatusCodes.CREATED).json({ practicalTasksTurnedIn })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async checkUserPracticalTask(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { userId, practicalTaskId, mark } = req.body
            console.log({ userId, practicalTaskId, mark })
            const practicalTasksTurnedIn = await practicalTasksRepository.updateUserPracticalTask({ userId, practicalTaskId, mark })

            return res.status(StatusCodes.CREATED).json({ practicalTasksTurnedIn })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

}

module.exports = new PracticalTaskController();
