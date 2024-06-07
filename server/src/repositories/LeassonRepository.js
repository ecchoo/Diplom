const { Leasson } = require('../models')

class LeassonRepository {
    async getById(id) {
        return await Leasson.findOne({ where: { id } })
    }

    async create({ name, partitionId, time, content }) {
        return await Leasson.create({ name, partitionId, time, content })
    }

    async update({ id, name, partitionId, time, content }) {
        return await Leasson.update({ name, partitionId, time, content }, { where: { id } })
    }

    async delete(id) {
        return await Leasson.destroy({ where: { id } })
    }
}

module.exports = new LeassonRepository();