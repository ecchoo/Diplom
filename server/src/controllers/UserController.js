const { StatusCodes } = require('http-status-codes')
const userCourseRepository = require('../repositories/UserCourseRepository')

class UserController {
    async addCourse(req, res) {
        try {
            console.log(req.userId)
            const { userId, body: { courseId } } = req
            const userCourse = await userCourseRepository.create({ courseId, userId })

            return res.status(StatusCodes.CREATED).json({ userCourse })
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }
}

module.exports = new UserController()