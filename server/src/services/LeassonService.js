const leassonRepository = require('../repositories/LeassonRepository')

class LeassonService {
    async createPartitionLeassons({ leassons, partitionId }) {
        await Promise.all(leassons.map(async ({ name, time, content }) => {
            await leassonRepository.create({ name, partitionId, time, content })
        }));
    }
}

module.exports = new LeassonService()