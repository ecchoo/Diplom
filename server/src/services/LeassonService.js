const leassonRepository = require('../repositories/LeassonRepository')
const courseRepository = require('../repositories/CourseRepository')

class LeassonService {
    async createPartitionLeassons(leassons, partitionId) {
        await Promise.all(leassons.map(async ({ name, time }) => {
            await leassonRepository.create({ name, partitionId, time })
        }));
    }
}

module.exports = new LeassonService()