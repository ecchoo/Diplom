const { body } = require('express-validator');
const { customValidation } = require('../../lang/customValidation');
const courseRepository = require('../../repositories/CourseRepository');
const { DIFFICULTY_LEVELS } = require('../../constants/difficultyLevels');
const { FIELDS_STUDY } = require('../../constants/fieldsStudy');

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
        body('difficultyLevel')
            .notEmpty().withMessage(messages.difficultyLevel.required)
            .isIn(Object.values(DIFFICULTY_LEVELS)).withMessage(messages.difficultyLevel.invalid),
        body('fieldStudy')
            .notEmpty().withMessage(messages.fieldStudy.required)
            .isIn(Object.values(FIELDS_STUDY)).withMessage(messages.fieldStudy.invalid),
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
