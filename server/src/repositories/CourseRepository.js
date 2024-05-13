const { Course, Module, Partition, Leasson, User, TeacherCourse, UserCourse } = require('../models')
const { ROLES } = require('../constants/roles')
const { filter: filterParams } = require('../config/params')
const { Op } = require('sequelize')

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

                        } // мб как-то можно isAuthor вытянуть
                    }
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
                    as: 'courseTeachers',
                    attributes: ['id', 'name', 'photo']
                }
            ]
        })
    }

    async getUserCourses(userId, params) {
        const where = { userId }

        if ('filter' in params) {
            const { column, option, value } = filterParams.courses[params.filter]
            where[column] = { [option]: value }
        }

        return await UserCourse.findAll({
            include: {
                model: Course,
                as: 'course',
                attributes: ['id', 'name', 'logo'],
                include: {
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
            },
            attributes: ['progress', 'createdAt'],
            where,
        })
    }

    async createCourse({ name, description, logo, chatId }) {
        return await Course.create({ name, description, logo, chatId })
    }

    async update({ id, name, description }) {
        return await Course.update({ name, description }, { where: { id } })
    }

    async delete(courseId) {
        return await Course.destroy({ where: { id: courseId } })
    }

    async createUserCourse({ courseId, userId }) {
        return await UserCourse.create({ courseId, userId })
    }
}

module.exports = new CourseRepository();