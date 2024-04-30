const { Course, Module, Partition, Leasson, User, UserCourse } = require('../models')
const { ROLES } = require('../constants/roles')

class CourseRepository {
    async list() {
        return await Course.findAll({
            include: [
                {
                    model: Module,
                    as: 'modules',
                    include: {
                        model: Partition,
                        as: 'partitions',
                        include: {
                            model: Leasson,
                            as: 'leassons'
                        }
                    }
                },
                {
                    model: User,
                    as: 'courseUsers',
                    where: { role: ROLES.TEACHER },
                },
            ]
        })
    }

    async getById(courseId) {
        return await Course.findByPk(courseId, {
            include: [
                {
                    model: Module,
                    as: 'modules',
                    include: {
                        model: Partition,
                        as: 'partitions',
                        include: {
                            model: Leasson,
                            as: 'leassons'
                        }
                    }
                },
                {
                    model: User,
                    as: 'courseUsers',
                    where: { role: ROLES.TEACHER },
                },
            ]
        })
    }

    async getUserCourses(userId) {
        return await UserCourse.findAll({
            include: {
                model: Course,
                as: 'course',
                attributes: ['id', 'name', 'logo', 'description'],
                include: {
                    model: User,
                    as: 'courseTeachers',
                    attributes: ['name', 'photo']
                },
            },
            where: {userId},
            attributes: ['progress', 'createdAt']
        })
    }

    async create({ name, description, logo }) {
        return await Course.create({ name, description, logo })
    }

    async update({ id, name, description }) {
        return await Course.update({ name, description }, { where: { id } })
    }

    async delete(courseId) {
        return await Course.destroy({ where: { id: courseId } })
    }
}

module.exports = new CourseRepository();