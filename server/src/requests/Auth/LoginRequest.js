const { body } = require("express-validator");

exports.loginValidation = () => {
    return [
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .notEmpty().withMessage('Password is required')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{6,}$/)
            .withMessage('Password ineligible'),
    ];
};