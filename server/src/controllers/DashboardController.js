const { StatusCodes } = require('http-status-codes')
const chatRepository = require('../repositories/ChatRepository')
const courseRepository = require('../repositories/CourseRepository')
const dasboardService = require('../services/DashboarService')

class DashboardController {
    async courseList(req, res) {
        try {
            const userCourses = await courseRepository.getUserCourses(req.userId)
            // текущий урок и всего уроков, задается автоматически при записи на курс и после прохождения урока 
            return res.status(StatusCodes.OK).json({ userCourses })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async chatList(req, res) {
        try {
            const userChats = await dasboardService.getUserChatList(req.userId)
            return res.status(StatusCodes.OK).json({ userChats })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new DashboardController()