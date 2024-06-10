const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const courseRepository = require('../../repositories/CourseRepository');
const testRepository = require('../../repositories/TestRepository');

exports.createUpdate = () => {
    const messages = customValidation.tests;
    return [
        body('name')
            .notEmpty().withMessage(messages.name.required)
            .isString().withMessage(messages.name.mustBeString),
        body('courseId')
            .notEmpty().withMessage(messages.courseId.required)
            .isInt().withMessage(messages.courseId.mustBeInteger)
            .custom(async (value, { req }) => {
                const course = await courseRepository.getById(value);
                if (!course?.id) {
                    return Promise.reject(messages.courseId.notFound);
                }

                const test = await testRepository.getByCourseId(value);
                if (test && !req.body.id) {
                    return Promise.reject(messages.courseId.exists);
                }
            }),
        body('questions')
            .notEmpty().withMessage(messages.questions.required)
            .isArray().withMessage(messages.questions.mustBeArray)
            .custom((value) => {
                if (value.length === 0) {
                    throw new Error(messages.questions.mustNotBeEmpty);
                }
                return true;
            })
    ];
};
