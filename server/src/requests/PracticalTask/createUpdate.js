const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const leassonRepository = require('../../repositories/LeassonRepository')

exports.createUpdate = () => {
    const messages = customValidation.practicalTasks;
    return [
        body('condition')
            .notEmpty().withMessage(messages.condition.required)
            .isString().withMessage(messages.condition.mustBeString),
        body('leassonId')
            .notEmpty().withMessage(messages.leassonId.required)
            .isInt().withMessage(messages.leassonId.mustBeInteger)
            .custom(async (value) => {
                const leasson = await leassonRepository.getById(value);
                if (!leasson?.id) {
                    return Promise.reject(messages.leassonId.notFound);
                }
            }),
    ];
};
