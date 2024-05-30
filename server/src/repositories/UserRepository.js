const { User, UserChat, TeacherCourse, LockedUser } = require('../models')

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

    async updateUser({ id, name, email, password, role, photo, verified }) {
        return User.update({ name, email, password, role, photo, verified }, { where: { id } })
    }

    async verify(userId) {
        return await User.update({ verified: true }, { where: { id: userId } })
    }

    async create({ name, email, password, role, verified, photo }) {
        return await User.create({ name, email, password, role, verified, photo })
    }

    async createLockedUser({ chatId, userId, moderatorId, reason, duration }) {
        return await LockedUser.create({ chatId, userId, moderatorId, reason, duration })
    }

    async deleteLockedUser(id) {
        return await LockedUser.update({ deletedAt: new Date() }, { where: { id } })
    }

    async createTeacherCourse({ teacherId, courseId, isAuthor }) {
        return await TeacherCourse.create({ teacherId, courseId, isAuthor })
    }
}

module.exports = new UserRepository()