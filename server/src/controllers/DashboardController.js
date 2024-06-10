const { StatusCodes } = require('http-status-codes')
const dasboardService = require('../services/DashboarService')
const chatService = require('../services/ChatService')
const { validationResult } = require('express-validator')
const practicalTaskRepository = require('../repositories/PracticalTaskRepository')

class DashboardController {
    async getUserCourseList(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { userId, query: params } = req

            const userCourses = await dasboardService.getUserCourseList({ userId, params })
            return res.status(StatusCodes.OK).json({ userCourses })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async getUserCourse(req, res) {
        try {
            const { userId, params: { id: courseId } } = req
            console.log(courseId)

            const userCourse = await dasboardService.getUserCourseById({ userId, courseId })
            console.log('userCourse', userCourse)
            return res.status(StatusCodes.OK).json({ userCourse })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async getTeacherCourseList(req, res) {
        try {
            const { userId } = req

            const teacherCourses = await dasboardService.getTeacherCourseList({ userId })
            console.log(teacherCourses)
            return res.status(StatusCodes.OK).json({ teacherCourses })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async getTeacherCourse(req, res) {
        try {
            const { userId, params: { id: courseId } } = req

            const teacherCourse = await dasboardService.getTeacherCourseByCourseId({ userId, courseId })

            return res.status(StatusCodes.OK).json({ teacherCourse })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async getChatList(req, res) {
        try {
            const { userId, query: { search } } = req
            const userChats = await chatService.getUserChatList({ userId, search })
            return res.status(StatusCodes.OK).json({ userChats })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async getUserStatistics(req, res) {
        try {
            const { userId } = req
            const tasks = await practicalTaskRepository.getUserPracticalTasks(userId)
            return res.status(StatusCodes.OK).json({ tasks })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new DashboardController()