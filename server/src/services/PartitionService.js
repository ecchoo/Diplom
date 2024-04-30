const partitionRepository = require('../repositories/PartitionRepository')
const leassonService = require('./LeassonService')

class PartitionService {
    async createModulePartitions(partitions, moduleId) {
        await Promise.all(partitions.map(async ({ name, description, leassons }) => {
            const { id: partitionId } = await partitionRepository.create({ name, description, moduleId })
            await leassonService.createPartitionLeassons(leassons, partitionId)
        }));
    }
}

module.exports = new PartitionService()