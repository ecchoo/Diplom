const leassonRepository = require('../repositories/LeassonRepository')

class LeassonService {
    async createLeassons({ leassons, partitionId }) {
        await Promise.all(leassons.map(async (leasson) => {
            await leassonRepository.create({ partitionId, ...leasson })
        }))
    }

    async updateLeassons(leassons) {
        await Promise.all(leassons.map(async (leasson) => {
            await leassonRepository.update(leasson)
        }))
    }
}

module.exports = new LeassonService()