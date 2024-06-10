const { Test, Course, Question, Answer, UserTest } = require('../models');

class TestRepository {
    async getById(id) {
        return await Test.findByPk(id, {
            include: [
                {
                    model: Course,
                    as: 'course'
                },
                {
                    model: Question,
                    as: 'questions',
                    include: {
                        model: Answer,
                        as: 'answers'
                    }
                }
            ]
        });
    }

    async getByCourseId(courseId) {
        return await Test.findOne({ where: { courseId } })
    }

    async getUserTest({ testId, userId }) {
        console.log({ testId, userId })
        return await UserTest.findOne({ where: { testId, userId } })
    }

    // async getAllByModuleId(moduleId) {
    //     return await Test.findAll({ where: { moduleId } });
    // }

    async create({ name, courseId }) {
        return await Test.create({ name, courseId });
    }

    async update({ id, name, courseId }) {
        return await Test.update({ name, courseId }, { where: { id } });
    }

    async delete(id) {
        return await Test.destroy({ where: { id } });
    }

    async createUserTest({ userId, testId }) {
        return await UserTest.create({ userId, testId })
    }

    async deleteUserTestsByTestId(testId) {
        return await UserTest.destroy({ where: { testId } })
    }
}

module.exports = new TestRepository();
