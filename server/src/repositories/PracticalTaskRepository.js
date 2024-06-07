const { PracticalTask, UserPracticalTask } = require('../models')

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

    async getUserPracticalTasks(userId) {
        return UserPracticalTask.findAll({ where: { userId } })
    }
}

module.exports = new PracticalTaskRepository()