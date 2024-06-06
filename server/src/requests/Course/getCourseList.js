const { query } = require('express-validator')
const params = require('../../config/params')

exports.getUserCourseList = () => {
    return [
        query('filter').optional().isIn(Object.keys(params.filter.userCourses))
    ]
}