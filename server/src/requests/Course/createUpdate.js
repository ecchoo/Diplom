const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const courseRepository = require('../../repositories/CourseRepository')


exports.createUpdate = () => {
    const messages = customValidation.courses;
    return [
        body('name')
            .notEmpty().withMessage(messages.name.required)
            .isString().withMessage(messages.name.mustBeString)
            .custom(async (value, { req }) => {
                const existingCourse = await courseRepository.getByName(value);
                if (existingCourse && existingCourse.id !== req.body.id) {
                    return Promise.reject(messages.name.mustBeUnique);
                }
            }),
        body('description')
            .notEmpty().withMessage(messages.description.required)
            .isString().withMessage(messages.description.mustBeString),
        body('logo')
            .notEmpty().withMessage(messages.logo.required),
        // .isURL().withMessage(messages.logo.mustBeUrl),
        body('teachers')
            .notEmpty().withMessage(messages.teachers.required)
            .isArray().withMessage(messages.teachers.mustBeArray)
            .custom((value) => {
                if (value.length === 0) {
                    throw new Error(messages.teachers.mustNotBeEmpty);
                }
                return true;
            })
    ];
};
