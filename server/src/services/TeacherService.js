const userRepository = require('../repositories/UserRepository')
const teacherRepository = require('../repositories/TeacherRepository')


class TeacherService {
    async list() {
        const teacherList = await teacherRepository.list()

        return await Promise.all(teacherList.map(teacher => {
            const { id, user: { id: userId, ...userInfo } } = teacher.toJSON()

            return { id, userId, ...userInfo }
        }))
    }

    async createCourseTeachers({ teachers, courseId }) {
        await Promise.all(teachers.map(async ({ id: teacherId, isAuthor }) => {
            await userRepository.createTeacherCourse({ courseId, teacherId, isAuthor: true })
        }))
    }
}

module.exports = new TeacherService()