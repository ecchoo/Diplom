const courseRepository = require("../repositories/CourseRepository")
const moduleRepository = require('../repositories/ModuleRepository')
const partitionRepository = require('../repositories/PartitionRepository')
const leassonRepository = require('../repositories/LeassonRepository')

class CourseService {
    async createCourse({ name, description, modules }) {
        const { id: courseId } = await courseRepository.create({ name, description })

        await Promise.all(modules.map(async ({ name, description, partitions }) => {
            const { id: moduleId } = await moduleRepository.create({ name, description, courseId })

            await Promise.all(partitions.map(async ({ name, description, leassons }) => {
                const { id: partitionId } = await partitionRepository.create({ name, description, moduleId })

                await Promise.all(leassons.map(async ({ name }) => {
                    await leassonRepository.create({ name, partitionId })
                }));
            }));
        }));

        return courseId;
    }

    async updateCourse({ id, name, description, modules }) {
        await courseRepository.update({ id, name, description })

        await Promise.all(modules.map(async ({ id, name, description, courseId, partitions }) => {
            await moduleRepository.update({ id, name, description, courseId })

            await Promise.all(partitions.map(async ({ id, name, description, moduleId, leassons }) => {
                await partitionRepository.update({ id, name, description, moduleId })

                await Promise.all(leassons.map(async ({ id, name, partitionId }) => {
                    await leassonRepository.update({ id, name, partitionId })
                }));
            }));
        }));

        return true
    }
}

module.exports = new CourseService();