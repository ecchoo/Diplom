const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const questionRepository = require('../../repositories/QuestionRepository');

exports.createUpdate = () => {
    const messages = customValidation.answers;
    return [
        body('questionId')
            .notEmpty().withMessage(messages.questionId.required)
            .isInt().withMessage(messages.questionId.mustBeInteger)
            .custom(async (value) => {
                const question = await questionRepository.getById(value);
                if (!question?.id) {
                    return Promise.reject(messages.questionId.notFound);
                }
            }),
        body('answerText')
            .notEmpty().withMessage(messages.answerText.required)
            .isString().withMessage(messages.answerText.mustBeString),
        body('isCorrect')
            .optional()
            .isBoolean().withMessage(messages.isCorrect.mustBeBoolean),
    ];
};
