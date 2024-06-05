const { Partition } = require('../models')

class PartitionRepository {
    async getById(id) {
        return await Partition.findOne({ where: { id } })
    }

    async create({ name, description, moduleId }) {
        return await Partition.create({ name, description, moduleId })
    }

    async update({ id, name, description, moduleId }) {
        return await Partition.update({ name, description, moduleId }, { where: { id } })
    }

    async delete(id) {
        return await Partition.destroy({ where: { id } })
    }
}

module.exports = new PartitionRepository();