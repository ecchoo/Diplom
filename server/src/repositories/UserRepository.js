const { ROLES } = require('../constants/roles')
const { User, UserChat, UserCourse, Chat, LockedUser, UserProgress, Course } = require('../models')

class UserRepository {
    async getByEmail(email) {
        return await User.findOne({ where: { email }, attributes: ['id', 'email', 'verified', 'name', 'role', 'photo', 'password'] })
    }

    async getById(id) {
        return await User.findByPk(id, { attributes: ['id', 'email', 'verified', 'name', 'role', 'photo'] })
    }

    async getByName(name) {
        return await User.findOne({ where: { name }, attributes: ['id', 'email', 'verified', 'name', 'role', 'photo'] })
    }

    async getCourseUsers(courseId) {
        return await UserCourse.findAll({
            where: { courseId },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
                include: {
                    model: UserProgress,
                    as: 'userProgress',
                    attributes: ['id', 'courseId', 'userId', 'currentLeassonId', 'currentPracticalTaskId'],
                }
            }
        })
    }

    async getChatUsers(chatId) {
        return await UserChat.findAll({
            where: { chatId },
        })
    }

    async getModerator() {
        return await User.findOne({
            where: { role: ROLES.MODERATOR },
            include: {
                model: Chat,
                as: 'userChats'
            }
        })
    }

    async updateUser({ id, name, email, password, role, photo, verified }) {
        return User.update({ name, email, password, role, photo, verified }, { where: { id } })
    }

    async updateUserProgress({ userId, courseId, currentLeassonId, currentPracticalTaskId }) {
        return await UserProgress.update({ currentLeassonId, currentPracticalTaskId }, { where: { userId, courseId } })
    }

    async verify(userId) {
        return await User.update({ verified: true }, { where: { id: userId } })
    }

    async create({ name, email, password, role, verified, photo }) {
        return await User.create({ name, email, password, role, verified, photo })
    }

    async createUserProgress({ userId, courseId, currentLeassonId, currentPracticalTaskId }) {
        return await UserProgress.create({ userId, courseId, currentLeassonId, currentPracticalTaskId })
    }

    async createLockedUser({ chatId, userId, moderatorId, reason, duration }) {
        return await LockedUser.create({ chatId, userId, moderatorId, reason, duration })
    }

    async deleteLockedUser(id) {
        return await LockedUser.update({ deletedAt: new Date() }, { where: { id } })
    }
}

module.exports = new UserRepository()