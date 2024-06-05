const { Teacher, User, TeacherCourse } = require('../models')

class TeacherRepository {
    async list() {
        return await Teacher.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'photo']
            },
            attributes: ['id'],
        })
    }

    async getTeachersByCourseId(courseId) {
        return await TeacherCourse.findAll({
            where: { courseId },
            attributes: ['id', 'courseId', 'teacherId', 'isAuthor', 'createdAt']
        })
    }

    async getTeacherByUserId(userId) {
        return await Teacher.findOne({ where: { userId }, attributes: ['id'] })
    }

    async createTeacherCourse({ teacherId, courseId, isAuthor }) {
        return await TeacherCourse.create({ teacherId, courseId, isAuthor })
    }

    async deleteTeacherCourse(id) {
        return await TeacherCourse.destroy({ where: { id } })
    }
}

module.exports = new TeacherRepository()