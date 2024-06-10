const { Answer, UserAnswer } = require('../models');

class AnswerRepository {
    async getById(id) {
        return await Answer.findOne({ where: { id } });
    }

    async getAllByQuestionId(questionId) {
        return await Answer.findAll({ where: { questionId } });
    }

    async create({ questionId, answerText, isCorrect }) {
        return await Answer.create({ questionId, answerText, isCorrect });
    }

    async update({ id, questionId, answerText, isCorrect }) {
        return await Answer.update({ questionId, answerText, isCorrect }, { where: { id } });
    }

    async delete(id) {
        return await Answer.destroy({ where: { id } });
    }

    async createUserAnswer({ userId, questionId, answerId, userTestId }) {
        return await UserAnswer.create({ userId, questionId, answerId, userTestId });
    }

    async getUserAnswersByTestId(userTestId) {
        return await UserAnswer.findAll({ where: { userTestId } })
    }
}

module.exports = new AnswerRepository();
