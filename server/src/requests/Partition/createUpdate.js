const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const moduleRepository = require('../../repositories/ModuleRepository')

exports.createUpdate = () => {
    const messages = customValidation.partitions;
    return [
        body('name')
            .notEmpty().withMessage(messages.name.required)
            .isString().withMessage(messages.name.mustBeString),
        body('description')
            .notEmpty().withMessage(messages.description.required)
            .isString().withMessage(messages.description.mustBeString),
        body('moduleId')
            .notEmpty().withMessage(messages.moduleId.required)
            .isInt().withMessage(messages.moduleId.mustBeInteger)
            .custom(async (value) => {
                const module = await moduleRepository.getById(value);
                if (!module?.id) {
                    return Promise.reject(messages.moduleId.notFound);
                }
            }),
    ];
};
