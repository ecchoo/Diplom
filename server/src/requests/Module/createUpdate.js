const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const courseRepository = require('../../repositories/CourseRepository')

exports.createUpdate = () => {
    const messages = customValidation.modules;
    return [
        body('name')
            .notEmpty().withMessage(messages.name.required)
            .isString().withMessage(messages.name.mustBeString),
        body('description')
            .notEmpty().withMessage(messages.description.required)
            .isString().withMessage(messages.description.mustBeString),
        // body('courseId')
        //     .notEmpty().withMessage(messages.courseId.required)
        //     .isInt().withMessage(messages.courseId.mustBeInteger)
        //     .custom(async (value) => {
        //         const course = await courseRepository.getById(value);
        //         if (!course?.id) {
        //             return Promise.reject(messages.courseId.notFound);
        //         }
        //     }),
    ];
};
