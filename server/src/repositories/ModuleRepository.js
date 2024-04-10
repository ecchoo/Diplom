const { Module } = require('../models')

class ModuleRepository {
    async create({ name, description, courseId }) {
        return await Module.create({ name, description, courseId })
    }

    async update({ id, name, description, courseId }) {
        return await Module.update({ name, description, courseId }, { where: { id } })
    }
}

module.exports = new ModuleRepository();