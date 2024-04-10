const { Partition } = require('../models')

class PartitionRepository {
    async create({ name, description, moduleId }){
        return await Partition.create({ name, description, moduleId })
    }

    async update({ id, name, description, moduleId }) {
        return await Partition.update({ name, description, moduleId }, { where: { id } })
    }
}

module.exports = new PartitionRepository();