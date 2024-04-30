const leassonRepository = require('../repositories/LeassonRepository')

class LeassonService {
    async createPartitionLeassons(leassons, partitionId) {
        await Promise.all(leassons.map(async ({ name }) => {
            await leassonRepository.create({ name, partitionId })
        }));
    }
}

module.exports = new LeassonService()