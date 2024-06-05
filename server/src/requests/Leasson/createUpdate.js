const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const partitionRepository = require('../../repositories/PartitionRepository')

exports.createUpdate = () => {
    const messages = customValidation.leassons;
    return [
        body('name')
            .notEmpty().withMessage(messages.name.required)
            .isString().withMessage(messages.name.mustBeString),
        body('content')
            .notEmpty().withMessage(messages.content.required)
            .isString().withMessage(messages.content.mustBeString),
        body('time')
            .notEmpty().withMessage(messages.time.required)
            .isInt().withMessage(messages.time.mustBeInteger)
            .custom((value) => {
                if (value <= 0) {
                    throw new Error(messages.time.mustBeGreaterThanZero);
                }
                return true;
            }),
        body('partitionId')
            .notEmpty().withMessage(messages.partitionId.required)
            .isInt().withMessage(messages.partitionId.mustBeInteger)
            .custom(async (value) => {
                const partition = await partitionRepository.getById(value);
                if (!partition?.id) {
                    return Promise.reject(messages.partitionId.notFound);
                }
            }),
    ];
};
