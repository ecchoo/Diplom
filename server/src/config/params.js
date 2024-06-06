const { Op } = require("sequelize");
const { DIFFICULTY_LEVELS } = require("../constants/difficultyLevels");
const { FIELDS_STUDY } = require("../constants/fieldsStudy");

module.exports = {
    sort: {
        courses: {
            popularityAsc: {

            },
            popularityDesc: {

            },
            timeAsc: {

            },
            timeDesc: {

            }
        }
    },
    filter: {
        userCourses: {
            all: {
                column: 'progress',
                option: Op.gte,
                value: 0
            },
            finalized: {
                column: 'progress',
                option: Op.eq,
                value: 100
            },
            unbegun: {
                column: 'progress',
                option: Op.eq,
                value: 0
            },
            started: {
                column: 'progress',
                option: Op.between,
                value: [1, 99]
            }
        },
        courses: {
            difficultyLevel: {
                all: {
                    column: 'difficultyLevel',
                    option: Op.in,
                    value: Object.values(DIFFICULTY_LEVELS)
                },
                elementary: {
                    column: 'difficultyLevel',
                    option: Op.eq,
                    value: DIFFICULTY_LEVELS.ELEMENTARY
                },
                medium: {
                    column: 'difficultyLevel',
                    option: Op.eq,
                    value: DIFFICULTY_LEVELS.MEDIUM
                },
                advanced: {
                    column: 'difficultyLevel',
                    option: Op.eq,
                    value: DIFFICULTY_LEVELS.ADVANCED
                }
            },
            fieldStudy: {
                all: {
                    column: 'fieldStudy',
                    option: Op.in,
                    value: Object.values(FIELDS_STUDY)
                },
                'back-end': {
                    column: 'fieldStudy',
                    option: Op.eq,
                    value: FIELDS_STUDY.BACK_END
                },
                'front-end': {
                    column: 'fieldStudy',
                    option: Op.eq,
                    value: FIELDS_STUDY.FRONT_END
                },
                qa: {
                    column: 'fieldStudy',
                    option: Op.eq,
                    value: FIELDS_STUDY.QA
                }
            }
        },
    }
}