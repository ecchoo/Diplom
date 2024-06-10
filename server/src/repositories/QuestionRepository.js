const { Question } = require('../models');

class QuestionRepository {
    async getById(id) {
        return await Question.findOne({ where: { id } });
    }

    async getAllByTestId(testId) {
        return await Question.findAll({ where: { testId } });
    }

    async create({ questionText, testId }) {
        return await Question.create({ questionText, testId });
    }

    async update({ id, questionText, testId }) {
        return await Question.update({ questionText, testId }, { where: { id } });
    }

    async delete(id) {
        return await Question.destroy({ where: { id } });
    }
}

module.exports = new QuestionRepository();
