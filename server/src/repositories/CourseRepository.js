const { Course, Module, Partition, Leasson } = require('../models')

class CourseRepository {
    async list() {
        return await Course.findAll({
            include: {
                model: Module,
                include: {
                    model: Partition,
                    include: Leasson
                }
            }
        })
    }

    async getById(courseId) {
        return await Course.findByPk(courseId, {
            include: {
                model: Module,
                include: {
                    model: Partition,
                    include: Leasson
                }
            }
        })
    }

    async create({ name, description }) {
        return await Course.create({ name, description })
    }

    async update({ id, name, description }) {
        return await Course.update({ name, description }, { where: { id } })
    }

    async delete(courseId) {
        return await Course.destroy({ where: { id: courseId } })
    }
}

module.exports = new CourseRepository();