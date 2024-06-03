const { Leasson } = require('../models')

class LeassonRepository {
    async create({ name, partitionId, time, content }) {
        return await Leasson.create({ name, partitionId, time, content })
    }

    async update({ id, name, partitionId, time, content }) {
        return await Leasson.update({ name, partitionId, time }, { where: { id } })
    }
}

module.exports = new LeassonRepository();