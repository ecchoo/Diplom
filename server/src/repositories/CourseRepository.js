const { Course, Module, Partition, Leasson, User, Teacher, UserCourse, Review, TeacherCourse } = require('../models')
const { ROLES } = require('../constants/roles')
const { filter: filterParams } = require('../config/params')
const { Op, where } = require('sequelize')

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
                    model: Teacher,
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'photo']
                    },
                    attributes: ['id', 'userId'],
                    as: 'teachers',
                    through: {
                        attributes: ['isAuthor'],
                        where: { isAuthor: true }
                    },
                }
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
                    model: Teacher,
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'photo']
                    },
                    attributes: ['id', 'userId', 'bio', 'yearsExperience'],
                    as: 'teachers',
                    through: {
                        attributes: ['isAuthor'],
                    },
                },
                {
                    model: Review,
                    as: 'reviews',
                    attributes: ['id', 'text', 'createdAt'],
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'photo']
                    }
                }
            ]
        })
    }

    async getByName(name) {
        return await Course.findOne({ where: { name } })
    }

    async getUserCourseList({ userId, params }) {
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
                        model: Teacher,
                        include: {
                            model: User,
                            as: 'user',
                            attributes: ['name', 'photo']
                        },
                        attributes: ['id', 'userId'],
                        as: 'teachers',
                        through: {
                            attributes: ['isAuthor'],
                            where: { isAuthor: true }
                        },
                    }
                ],
            },
            attributes: ['progress', 'createdAt'],
            where,
        })
    }

    async getTeacherCourseList({ teacherId }) {
        console.log(teacherId)
        return await TeacherCourse.findAll({
            where: { teacherId },
            attributes: [],
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'name', 'logo'],
                    include: [
                        {
                            model: Module,
                            as: 'modules',
                            required: false,
                            include: {
                                model: Partition,
                                as: 'partitions',
                                required: false,
                                include: {
                                    model: Leasson,
                                    as: 'leassons',
                                    required: false,
                                }
                            }
                        },
                    ],
                },
            ]
        });
    }


    async createCourse({ name, description, logo }) {
        return await Course.create({ name, description, logo })
    }

    async update({ id, name, description, logo }) {
        return await Course.update({ name, description, logo }, { where: { id } })
    }

    async delete(courseId) {
        return await Course.destroy({ where: { id: courseId } })
    }

    async createUserCourse({ courseId, userId }) {
        return await UserCourse.create({ courseId, userId })
    }
}

module.exports = new CourseRepository();