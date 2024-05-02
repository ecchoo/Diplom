const courseRepository = require('../repositories/CourseRepository')
const userRepository = require('../repositories/UserRepository')
const leassonService = require('../services/LeassonService')

class DashboardService {
    async getUserCourses(userId) {
        const userCourses = await courseRepository.getUserCourses(userId);

        return Promise.all(userCourses.map(async ({ progress, createdAt, course }) => {
            const { id, name, logo } = course
            const { teacher: author } = await userRepository.getCourseAuthor(course.id)
            const { countLeassons, courseTime } = await leassonService.getCountLeassonsAndDuration(course)

            return {
                id,
                name,
                logo,
                author,
                progress,
                countLeassons,
                courseTime,
                createdAt,
            };
        }));
    }

}

module.exports = new DashboardService()