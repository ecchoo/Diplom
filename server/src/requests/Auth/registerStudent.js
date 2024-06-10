const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const userRepository = require('../../repositories/UserRepository');

exports.registerStudent = () => {
    const messages = customValidation.user

    return [
        body('name')
            .notEmpty().withMessage(messages.name.required)
            .custom(async (value, { req }) => {
                console.log('value', value)
                const user = await userRepository.getByName(value)
                if (user) {
                    throw new Error(messages.name.unique)
                }

                return true
            }),
        body('email')
            .isEmail().withMessage(messages.email.mustBeEmail)
            .custom(async (value, { req }) => {
                const user = await userRepository.getByEmail(value)
                console.log('user', user)
                if (user) {
                    throw new Error(messages.email.unique)
                }

                return true
            }),
        body('password')
            .notEmpty().withMessage(messages.password.required)
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{6,}$/).withMessage(messages.password.ineligible),
        body('passwordConfirm')
            .notEmpty().withMessage(messages.passwordConfirm.required)
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(messages.passwordConfirm.equal);
                }

                return true;
            }),
    ];
};