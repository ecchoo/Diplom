const { Leasson } = require('../models')

class LeassonRepository {
    async create({ name, partitionId, time }) {
        return await Leasson.create({ name, partitionId, time })
    }

    async update({ id, name, partitionId, time }) {
        return await Leasson.update({ name, partitionId, time }, { where: { id } })
    }
}

module.exports = new LeassonRepository();