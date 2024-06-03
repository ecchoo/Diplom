const courseRepository = require("../repositories/CourseRepository")
const chatRepository = require("../repositories/ChatRepository")
const chatService = require("../services/ChatService")
const moduleService = require('./ModuleService')
const teacherService = require('./TeacherService')
const { CHAT_TYPES } = require("../constants/chatTypes")

class CourseService {
    async getCourseList() {
        const courseList = await courseRepository.list()

        return await Promise.all(courseList.map(async ({ id, name, logo, modules, teachers }) => {
            const { countLeassons, courseTime } = await this.getCountLeassonsAndCourseTime(modules)
            const { user: { name: userName, photo }, TeacherCourse, ...authorInfo } = teachers[0].toJSON()

            return {
                id,
                name,
                logo,
                author: { name: userName, photo, ...authorInfo },
                countLeassons,
                courseTime,
            }
        }))
    }

    async getCourseById(courseId) {
        const { teachers, ...courseInfo } = (await courseRepository.getById(courseId)).toJSON()

        const { countLeassons, courseTime } = await this.getCountLeassonsAndCourseTime(courseInfo.modules)

        const transformTeachers = await Promise.all(teachers.map((teacher) => {
            const { user, TeacherCourse, ...teacherInfo } = teacher

            return { ...user, ...TeacherCourse, ...teacherInfo }
        }))

        return { ...courseInfo, countLeassons, courseTime, teachers: transformTeachers }
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

    async createCourse({ name, description, logo, modules, teachers }) {
        const { id: courseId } = await courseRepository.createCourse({ name, description, logo })

        await teacherService.createCourseTeachers({ teachers, courseId })
        await moduleService.createCourseModules({ modules, courseId })

        await chatService.createCourseChat({
            name,
            logo,
            courseId,
            teachers,
            type: CHAT_TYPES.GROUP,
        })

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

    async enrollCourse({ userId, courseId }) {
        const { chatId } = await chatRepository.getCourseChat(courseId)

        await courseRepository.createUserCourse({ userId, courseId })
        await chatService.addUserInChat({ userId, chatId })

        return true
    }
}

module.exports = new CourseService();