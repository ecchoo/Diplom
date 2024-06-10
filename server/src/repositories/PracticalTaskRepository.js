const { PracticalTask, UserPracticalTask, User } = require('../models')

class PracticalTaskRepository {
    async create({ condition, leassonId }) {
        return await PracticalTask.create({ condition, leassonId })
    }

    async update({ id, condition, leassonId }) {
        return await PracticalTask.update({ condition, leassonId }, { where: { id } })
    }

    async delete(id) {
        return await PracticalTask.destroy({ where: { id } })
    }

    async createUserPracticalTask({ filePath, userId, practicalTaskId }) {
        return await UserPracticalTask.create({ filePath, userId, practicalTaskId })
    }

    async updateUserPracticalTask({ filePath, userId, practicalTaskId, mark }) {
        return await UserPracticalTask.update({ filePath, mark }, { where: { userId, practicalTaskId } })
    }

    async getUserPracticalTasks(userId) {
        return UserPracticalTask.findAll({ where: { userId } })
    }

    async getUserPracticalTasksTurnedInById(practicalTaskId) {
        return await UserPracticalTask.findAll({
            where: { practicalTaskId },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name']
            }
        })
    }
}

module.exports = new PracticalTaskRepository()