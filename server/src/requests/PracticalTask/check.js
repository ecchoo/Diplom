const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');

exports.check = () => {
    const messages = customValidation.practicalTasks;

    return [
        body('mark')
            .isInt({ min: 0, max: 10 }).withMessage(messages.mark.invalidRange),
    ];
};
