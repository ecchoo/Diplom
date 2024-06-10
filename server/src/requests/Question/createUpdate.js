const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const testRepository = require('../../repositories/TestRepository');

exports.createUpdate = () => {
    const messages = customValidation.questions;
    return [
        body('questionText')
            .notEmpty().withMessage(messages.questionText.required)
            .isString().withMessage(messages.questionText.mustBeString),
        body('testId')
            .notEmpty().withMessage(messages.testId.required)
            .isInt().withMessage(messages.testId.mustBeInteger)
            .custom(async (value) => {
                const test = await testRepository.getById(value);
                if (!test?.id) {
                    return Promise.reject(messages.testId.notFound);
                }
            }),
    ];
};