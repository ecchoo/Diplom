const testRepository = require('../repositories/TestRepository');
const questionRepository = require('../repositories/QuestionRepository');
const answerRepository = require('../repositories/AnswerRepository');
const courseRepository = require('../repositories/CourseRepository');
const progressService = require("./ProgressService");
const userRepository = require('../repositories/UserRepository');

class TestService {
    async create({ name, courseId, questions }) {
        const test = await testRepository.create({ name, courseId });

        for (const question of questions) {
            const createdQuestion = await questionRepository.create({
                questionText: question.questionText,
                testId: test.id
            });

            for (const answer of question.answers) {
                await answerRepository.create({
                    questionId: createdQuestion.id,
                    answerText: answer.answerText,
                    isCorrect: answer.isCorrect
                });
            }
        }

        // const courseUsers = await userRepository.getCourseUsers(courseId)
        // if (courseUsers && courseUsers.length) {
        //     for (const { userId } of courseUsers) {
        //         await progressService.calculateAndUpdateProgress({ courseId, userId })
        //     }
        // }

        return test
    }

    async update({ id, name, courseId, questions }) {
        await testRepository.update({ id, name, courseId });

        const existingQuestions = await questionRepository.getAllByTestId(id);

        for (const question of existingQuestions) {
            await questionRepository.delete(question.id);
        }

        for (const question of questions) {
            const createdQuestion = await questionRepository.create({
                questionText: question.questionText,
                testId: id
            });

            for (const answer of question.answers) {
                await answerRepository.create({
                    questionId: createdQuestion.id,
                    answerText: answer.answerText,
                    isCorrect: answer.isCorrect
                });
            }
        }

        await testRepository.deleteUserTestsByTestId(id);

        // const courseUsers = await userRepository.getCourseUsers(courseId);
        // if (courseUsers && courseUsers.length) {
        //     for (const { userId } of courseUsers) {
        //         await progressService.calculateAndUpdateProgress({ courseId, userId });
        //     }
        // }
    }

    async getUserTestResult({ userId, courseId }) {
        const test = await testRepository.getByCourseId(courseId)
        if (!test) return null

        const userTest = await testRepository.getUserTest({ testId: test.id, userId })
        if (!userTest) return null

        const userAnswers = await answerRepository.getUserAnswersByTestId(userTest.id)
        const formattedUserAnswers = userAnswers.reduce((acc, { questionId, answerId }) => {
            if (!acc[questionId]) {
                acc[questionId] = { questionId, answers: [] };
            }
            acc[questionId].answers.push(answerId);
            return acc;
        }, {});


        const results = await this.calculateResults(Object.values(formattedUserAnswers))
        const correctCount = (results.filter(a => a.isCorrect)).length

        return `${correctCount}/${results.length}`
    }

    async calculateResults(userAnswers) {
        const results = [];

        for (const { questionId, answers } of userAnswers) {
            const correctAnswers = await answerRepository.getAllByQuestionId(questionId);
            const correctAnswerIds = correctAnswers.filter(answer => answer.isCorrect).map(answer => answer.id);

            const isCorrect = correctAnswerIds.every(id => answers.includes(id)) && correctAnswerIds.length === answers.length;

            results.push({ questionId, isCorrect });
        }

        return results;
    }

    async submit({ testId, userId, userAnswers }) {
        // const test = await testRepository.getById(testId);
        const userTest = await testRepository.createUserTest({ testId, userId });

        const results = await this.calculateResults(userAnswers);

        for (const { questionId, answers } of userAnswers) {
            for (const answerId of answers) {
                await answerRepository.createUserAnswer({ userId, questionId, answerId, userTestId: userTest.id });
            }
        }

        // await courseRepository.updateUserCourse({ userId, courseId: test.courseId });

        return results;
    }

}

module.exports = new TestService();
