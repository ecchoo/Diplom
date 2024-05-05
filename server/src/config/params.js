const { Op } = require("sequelize");

module.exports = {
    filter: {
        courses: {
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
        }
    }
}