const courseRepository = require('../repositories/CourseRepository')
const userRepository = require('../repositories/UserRepository')
const courseService = require('../services/CourseService')

class DashboardService {
    async getUserCourses(userId, params) {
        const userCourses = await courseRepository.getUserCourses(userId, params);
        // return userCourses

        return await Promise.all(userCourses.map(async ({ course, progress, createdAt: enrolmentDate }) => {
            const { id, name, logo, modules, teachers } = course
            const { user: { name: userName, photo }, TeacherCourse, ...authorInfo } = teachers[0].toJSON()

            const { countLeassons, courseTime } = await courseService.getCountLeassonsAndCourseTime(modules)

            return {
                id,
                name,
                logo,
                author: { name: userName, photo, ...authorInfo },
                progress,
                countLeassons,
                courseTime,
                enrolmentDate,
            }
        }));
    }

}

module.exports = new DashboardService()