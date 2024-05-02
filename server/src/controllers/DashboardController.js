const { StatusCodes } = require('http-status-codes')
const chatRepository = require('../repositories/ChatRepository')
const courseRepository = require('../repositories/CourseRepository')
const dasboardService = require('../services/DashboarService')
const chatService = require('../services/ChatService')

class DashboardController {
    async courseList(req, res) {
        try {
            const userCourses = await dasboardService.getUserCourses(req.userId)
            // текущий урок и всего уроков, задается автоматически при записи на курс и после прохождения урока 
            return res.status(StatusCodes.OK).json({ userCourses })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async chatList(req, res) {
        try {
            const userChats = await chatService.getUserChatList(req.userId)
            return res.status(StatusCodes.OK).json({ userChats })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new DashboardController()