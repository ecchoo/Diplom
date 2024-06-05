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
            await teacherRepository.createTeacherCourse({ courseId, teacherId, isAuthor: true })
        }))
    }

    async deleteCourseTeachers(courseTeachers) {
        await Promise.all(courseTeachers.map(async (courseTeacher) => {
            await teacherRepository.deleteTeacherCourse(courseTeacher.id)
        }))
    }
}

module.exports = new TeacherService()