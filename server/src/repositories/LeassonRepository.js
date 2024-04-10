const { Leasson } = require('../models')

class LeassonRepository {
    async create({ name, partitionId }){
        return await Leasson.create({ name, partitionId })
    }

    async update({ id, name, partitionId }) {
        return await Leasson.update({ name, partitionId }, { where: { id } })
    }
}

module.exports = new LeassonRepository();