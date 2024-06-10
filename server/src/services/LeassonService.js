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

    async delete({ leassonId, courseId }) {
        return await leassonRepository.delete(leassonId)
    }
}

module.exports = new LeassonService()