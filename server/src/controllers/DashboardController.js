const { StatusCodes } = require('http-status-codes')
const dasboardService = require('../services/DashboarService')
const chatService = require('../services/ChatService')
const { validationResult } = require('express-validator')

class DashboardController {
    async courseList(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { userId, query: params } = req

            const userCourses = await dasboardService.getUserCourses(userId, params)
            return res.status(StatusCodes.OK).json({ userCourses })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async chatList(req, res) {
        try {
            const { userId, query: { search } } = req
            const userChats = await chatService.getUserChatList({ userId, search })
            return res.status(StatusCodes.OK).json({ userChats })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new DashboardController()