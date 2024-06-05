const { Module } = require('../models')

class ModuleRepository {
    async getById(id) {
        return await Module.findOne({ where: { id } })
    }

    async create({ name, description, courseId }) {
        return await Module.create({ name, description, courseId })
    }

    async update({ id, name, description }) {
        return await Module.update({ name, description }, { where: { id } })
    }

    async delete(id) {
        return await Module.destroy({ where: { id } })
    }
}

module.exports = new ModuleRepository();