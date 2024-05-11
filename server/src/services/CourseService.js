const courseRepository = require("../repositories/CourseRepository")
const moduleService = require('./ModuleService')
const teacherService = require('./TeacherService')
const userRepository = require('../repositories/UserRepository')

class CourseService {
    async getCourseList() {
        const courseList = await courseRepository.list()

        return await Promise.all(courseList.map(async ({ id, name, logo, modules }) => {
            const { teacher: author } = await userRepository.getCourseAuthor(id)
            const { countLeassons, courseTime } = await this.getCountLeassonsAndCourseTime(modules)

            return {
                id,
                name,
                logo,
                author,
                countLeassons,
                courseTime,
            };
        }))
    }

    async getCountLeassonsAndCourseTime(courseModules) {
        const { countLeassons, courseTime } = courseModules.reduce((accumulator, { partitions }) => {
            partitions.forEach(({ leassons }) => {
                accumulator.countLeassons += leassons.length
                leassons.forEach(lesson => accumulator.courseTime += lesson.time)
            })

            return accumulator
        }, { countLeassons: 0, courseTime: 0 })

        return { countLeassons, courseTime }
    }

    async createCourse({ name, description, logo, modules, teacherIds }) {
        const { id: courseId } = await courseRepository.create({ name, description, logo })

        await teacherService.createCourseTeachers(teacherIds, courseId)
        await moduleService.createCourseModules(modules, courseId)

        return courseId
    }

    async updateCourse({ id, name, description, modules, teachers }) { //
        // await courseRepository.update({ id, name, description })

        // await Promise.all(teachers.map(async ({ id, courseId, teacherId }) => {
        //     await userCourseRepository.update({ id, courseId, userId: teacherId })
        // }))

        // await Promise.all(modules.map(async ({ id, name, description, courseId, partitions }) => {
        //     await moduleRepository.update({ id, name, description, courseId })

        //     await Promise.all(partitions.map(async ({ id, name, description, moduleId, leassons }) => {
        //         await partitionRepository.update({ id, name, description, moduleId })

        //         await Promise.all(leassons.map(async ({ id, name, partitionId }) => {
        //             await leassonRepository.update({ id, name, partitionId })
        //         }));
        //     }));
        // }));

        return true
    }
}

module.exports = new CourseService();