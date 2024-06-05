const courseRepository = require('../repositories/CourseRepository')
const teacherRepository = require('../repositories/TeacherRepository')
const courseService = require('../services/CourseService')

class DashboardService {
    async getUserCourseList({ userId, params }) {
        const userCourses = await courseRepository.getUserCourseList({ userId, params });
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

    async getTeacherCourseList({ userId }) {
        const { id: teacherId } = await teacherRepository.getTeacherByUserId(userId)
        const courseList = await courseRepository.getTeacherCourseList({ teacherId })

        return await Promise.all(courseList.map(({ course }) => course))
    }
}

module.exports = new DashboardService()