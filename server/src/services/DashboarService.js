const courseRepository = require('../repositories/CourseRepository')
const userRepository = require('../repositories/UserRepository')
const courseService = require('../services/CourseService')

class DashboardService {
    async getUserCourses(userId, params) {
        const userCourses = await courseRepository.getUserCourses(userId, params);
        // return userCourses
        return await Promise.all(userCourses.map(async ({ course, progress, createdAt: enrolmentDate }) => {
            const { id, name, logo } = course
            const { teacher: author } = await userRepository.getCourseAuthor(course.id)
            const { countLeassons, courseTime } = await courseService.getCountLeassonsAndCourseTime(course)

            return {
                id,
                name,
                logo,
                author,
                progress,
                countLeassons,
                courseTime,
                enrolmentDate,
            };
        }));
    }

}

module.exports = new DashboardService()