const userRepository = require('../repositories/UserRepository')

class TeacherService {
    async createCourseTeachers({ teachers, courseId }) {
        await Promise.all(teachers.map(async ({ id: teacherId, isAuthor }) => {
            await userRepository.createTeacherCourse({ courseId, teacherId, isAuthor })
        }))
    }
}

module.exports = new TeacherService()