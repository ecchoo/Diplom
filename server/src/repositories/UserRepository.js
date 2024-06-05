const { User, UserChat, TeacherCourse, LockedUser } = require('../models')

class UserRepository {
    async getByEmail(email) {
        return await User.findOne({ where: { email }, attributes: ['id', 'email', 'verified', 'name', 'role', 'photo'] })
    }

    async getById(id) {
        return await User.findByPk(id, { attributes: ['id', 'email', 'verified', 'name', 'role', 'photo'] })
    }

    async getByName(name) {
        return await User.findOne({ where: { name }, attributes: ['id', 'email', 'verified', 'name', 'role', 'photo'] })
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


}

module.exports = new UserRepository()