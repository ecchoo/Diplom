const { body } = require('express-validator')

exports.registerValidation = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .notEmpty().withMessage('Password is required')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{6,}$/)
            .withMessage('Password ineligible'),
        body('passwordConfirm').notEmpty().withMessage('Password confirmation is required')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }

                return true;
            }),
    ];
};