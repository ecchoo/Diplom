const { StatusCodes } = require('http-status-codes')
const teacherService = require('../services/TeacherService')

class TeacherController {
    async list(req, res) {
        try {
            const teacherList = await teacherService.list()
            return res.status(StatusCodes.OK).json({ teacherList })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new TeacherController()