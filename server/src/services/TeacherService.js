const userRepository = require('../repositories/UserRepository')

class TeacherService {
    async createCourseTeachers(teacherIds, courseId) {
        await Promise.all(teacherIds.map(async (teacherId) => {
            await userRepository.createTeacherCourse({ courseId, teacherId, isAuthor: true })
        }))
    }
}

module.exports = new TeacherService()