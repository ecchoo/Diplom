const moduleRepository = require('../repositories/ModuleRepository')
const partitionService = require('./PartitionService')

class ModuleService {
    async createModules({ modules, courseId }) {
        return await Promise.all(modules.map(async ({ partitions, ...moduleInfo }) => {
            const { id: moduleId } = await moduleRepository.create({ courseId, ...moduleInfo })
            await partitionService.createPartitions({ partitions, moduleId })
        }));
    }

    async updateModules(modules) {
        // получить новые модуль и создать их, старые обновить, а вот удаленный
        return await Promise.all(modules.map(async ({ partitions, ...moduleInfo }) => {
            await moduleRepository.update(moduleInfo)
            await partitionService.updatePartitions(partitions)
        }))
    }
}

module.exports = new ModuleService()