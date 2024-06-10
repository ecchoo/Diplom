const { UserTest } = require('../models');

class UserTestRepository {
    async getById(id) {
        return await UserTest.findOne({ where: { id } });
    }

    async getAllByUserId(userId) {
        return await UserTest.findAll({ where: { userId } });
    }

    async getAllByTestId(testId) {
        return await UserTest.findAll({ where: { testId } });
    }

    async create({ userId, testId }) {
        return await UserTest.create({ userId, testId });
    }

    async update({ id, userId, testId }) {
        return await UserTest.update({ userId, testId }, { where: { id } });
    }

    async delete(id) {
        return await UserTest.destroy({ where: { id } });
    }
}

module.exports = new UserTestRepository();
