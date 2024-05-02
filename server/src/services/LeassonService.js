const leassonRepository = require('../repositories/LeassonRepository')
const courseRepository = require('../repositories/CourseRepository')

class LeassonService {
    async createPartitionLeassons(leassons, partitionId) {
        await Promise.all(leassons.map(async ({ name, time }) => {
            await leassonRepository.create({ name, partitionId, time })
        }));
    }

    async getCountLeassonsAndDuration(course) {
        const { modules } = course;

        const { countLeassons, courseTime } = modules.reduce((accumulator, { partitions }) => {
            partitions.forEach(({ leassons }) => {
                accumulator.countLeassons += leassons.length;
                leassons.forEach(lesson => accumulator.courseTime += lesson.time);
            });
            return accumulator;
        }, { countLeassons: 0, courseTime: 0 });

        return { countLeassons, courseTime };
    }
}

module.exports = new LeassonService()