const { StatusCodes } = require('http-status-codes')
const userCourseRepository = require('../repositories/UserCourseRepository')
const courseRepository = require('../repositories/CourseRepository')

class UserController {
    async courseList(req, res) {
        try {
            const userCourses = await courseRepository.getUserCourses(req.userId)
            return res.status(StatusCodes.OK).json({ userCourses })
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    async addCourse(req, res) {
        try {
            const { userId, body: { courseId } } = req
            const userCourse = await userCourseRepository.create({ courseId, userId })

            return res.status(StatusCodes.CREATED).json({ userCourse })
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }
}

module.exports = new UserController()