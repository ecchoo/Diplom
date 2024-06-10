const courseRepository = require("../repositories/CourseRepository")
const chatRepository = require("../repositories/ChatRepository")
const chatService = require("../services/ChatService")
const moduleService = require('./ModuleService')
const teacherService = require('./TeacherService')
const { CHAT_TYPES } = require("../constants/chatTypes")
const teacherRepository = require("../repositories/TeacherRepository")
const userRepository = require("../repositories/UserRepository")

class CourseService {
    async getCourseList({ search, filters }) {
        const courseList = await courseRepository.list({ search, filters })

        return await Promise.all(courseList.map(async ({ id, name, logo, difficultyLevel, modules, teachers }) => {
            const { countLeassons, courseTime } = await this.getCountLeassonsAndCourseTime(modules)
            const { user: { name: userName, photo }, TeacherCourse, ...authorInfo } = teachers[0].toJSON()

            return {
                id,
                name,
                logo,
                difficultyLevel,
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
                leassons.forEach(leasson => accumulator.courseTime += leasson.time)
            })

            return accumulator
        }, { countLeassons: 0, courseTime: 0 })

        return { countLeassons, courseTime }
    }

    async createCourse({ name, description, logo, difficultyLevel, fieldStudy, teachers }) {
        const newCourse = await courseRepository.createCourse({ name, description, logo, difficultyLevel, fieldStudy })

        await teacherService.createCourseTeachers({ teachers, courseId: newCourse.id })

        await chatService.createCourseChat({
            name,
            logo,
            teachers,
            type: CHAT_TYPES.GROUP,
        })

        return newCourse
    }

    async updateCourse({ id, name, description, logo, difficultyLevel, fieldStudy, teachers }) {
        const oldTeachers = await teacherRepository.getTeachersByCourseId(id)

        return await Promise.all([
            await teacherService.deleteCourseTeachers(oldTeachers),
            await teacherService.createCourseTeachers({ teachers, courseId: id }),
            await courseRepository.update({ id, name, description, logo, difficultyLevel, fieldStudy })
        ])
    }

    async enrollCourse({ userId, courseId }) {
        const course = await courseRepository.getById(courseId);
        if (!course) {
            throw new Error(`Course with id ${courseId} not found`);
        }

        const { name, modules } = course;
        const { id: chatId } = await chatRepository.getCourseChat(name);

        await courseRepository.createUserCourse({ userId, courseId });
        await chatService.addUserInChat({ userId, chatId });

        let firstLeassonId = null;
        let firstPracticalTaskId = null;

        modules.some(module => {
            const leasson = module.partitions[0]?.leassons[0];
            if (leasson) {
                firstLeassonId = leasson.id;
                const task = leasson.practicalTasks[0];
                if (task) {
                    firstPracticalTaskId = task.id;
                    return true;
                }
            }
            return false;
        });

        await userRepository.createUserProgress({ userId, courseId, currentLeassonId: firstLeassonId, currentPracticalTaskId: firstPracticalTaskId });

        return true;
    }

}

module.exports = new CourseService();