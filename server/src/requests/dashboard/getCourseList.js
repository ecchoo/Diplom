const { query } = require('express-validator')
const params = require('../../config/params')

exports.getCourseList = () => {
    return [
        query('filter').optional().isIn(Object.keys(params.filter.courses))
    ]
}