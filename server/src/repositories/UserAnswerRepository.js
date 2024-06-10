const { UserAnswer } = require('../models');

class UserAnswerRepository {
    async getById(id) {
        return await UserAnswer.findOne({ where: { id } });
    }

    async getAllByUserId(userId) {
        return await UserAnswer.findAll({ where: { userId } });
    }

    async getAllByQuestionId(questionId) {
        return await UserAnswer.findAll({ where: { questionId } });
    }

    async create({ userId, questionId, answerId }) {
        return await UserAnswer.create({ userId, questionId, answerId });
    }

    async update({ id, userId, questionId, answerId }) {
        return await UserAnswer.update({ userId, questionId, answerId }, { where: { id } });
    }

    async delete(id) {
        return await UserAnswer.destroy({ where: { id } });
    }
}

module.exports = new UserAnswerRepository();
