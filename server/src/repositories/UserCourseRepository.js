const { UserCourse } = require('../models')

class UserCourseRepository {
    async create({ courseId, userId }) {
        return await UserCourse.create({ courseId, userId })
    }

    async update({ id, courseId, userId }) {
        return await UserCourse.update({ courseId, userId }, { where: { id } })
    }
}

module.exports = new UserCourseRepository()