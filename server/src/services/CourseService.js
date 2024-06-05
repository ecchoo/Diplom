const courseRepository = require("../repositories/CourseRepository")
const chatRepository = require("../repositories/ChatRepository")
const chatService = require("../services/ChatService")
const moduleService = require('./ModuleService')
const teacherService = require('./TeacherService')
const { CHAT_TYPES } = require("../constants/chatTypes")
const teacherRepository = require("../repositories/TeacherRepository")

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

    async createCourse({ name, description, logo, teachers }) {
        const newCourse = await courseRepository.createCourse({ name, description, logo })

        await teacherService.createCourseTeachers({ teachers, courseId: newCourse.id })

        await chatService.createCourseChat({
            name,
            logo,
            teachers,
            type: CHAT_TYPES.GROUP,
        })

        return newCourse
    }

    async updateCourse({ id, name, description, logo, teachers }) {
        const oldTeachers = await teacherRepository.getTeachersByCourseId(id)

        return await Promise.all([
            await teacherService.deleteCourseTeachers(oldTeachers),
            await teacherService.createCourseTeachers({ teachers, courseId: id }),
            await courseRepository.update({ id, name, description, logo })
        ])
    }

    async enrollCourse({ userId, courseId }) {
        const { name } = await courseRepository.getById(courseId)
        const { id } = await chatRepository.getCourseChat(name)

        await courseRepository.createUserCourse({ userId, courseId })
        await chatService.addUserInChat({ userId, chatId: id })

        return true
    }
}

module.exports = new CourseService();