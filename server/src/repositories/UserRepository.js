const { User, UserChat, TeacherCourse } = require('../models')

class UserRepository {
    async getByEmail(email) {
        return await User.findOne({ where: { email } })
    }

    async getById(id) {
        return await User.findByPk(id, { attributes: ['id', 'email', 'verified', 'name', 'role', 'photo'] })
    }

    async getChatUsers(chatId) {
        return await UserChat.findAll({
            where: { chatId },
        })
    }

    async getCourseAuthor(courseId) {
        return await TeacherCourse.findOne({
            where: { isAuthor: true, courseId },
            attributes: [],
            include: {
                model: User,
                as: 'teacher',
                attributes: ['name', 'photo']
            }
        })
    }

    async verify(userId) {
        return await User.update({ verified: true }, { where: { id: userId } })
    }

    async create({ name, email, password, role }) {
        return await User.create({ name, email, password, role })
    }

    async createTeacherCourse({ teacherId, courseId, isAuthor }) {
        return await TeacherCourse.create({ teacherId, courseId, isAuthor })
    }
}

module.exports = new UserRepository()