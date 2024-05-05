const moduleRepository = require('../repositories/ModuleRepository')
const partitionService = require('./PartitionService')

class ModuleService {
    async createCourseModules(modules, courseId) {
        await Promise.all(modules.map(async ({ name, description, partitions }) => {
            const { id: moduleId } = await moduleRepository.create({ name, description, courseId })
            await partitionService.createModulePartitions(partitions, moduleId)
        }));
    }
}

module.exports = new ModuleService()