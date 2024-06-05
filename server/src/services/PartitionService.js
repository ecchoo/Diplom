const partitionRepository = require('../repositories/PartitionRepository')
const leassonService = require('./LeassonService')

class PartitionService {
    async createPartitions({ partitions, moduleId }) {
        return await Promise.all(partitions.map(async ({ leassons, ...partitionInfo }) => {
            const { id: partitionId } = await partitionRepository.create({ moduleId, ...partitionInfo })
            await leassonService.createLeassons({ leassons, partitionId })
        }))
    }

    async updatePartitions(partitions) {
        return await Promise.all(partitions.map(async ({ leassons, ...partitionInfo }) => {
            await partitionRepository.update(partitionInfo)
            await leassonService.updateLeassons(leassons)
        }))
    }
}

module.exports = new PartitionService()