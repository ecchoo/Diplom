const courseRepository = require('../repositories/CourseRepository')
const teacherRepository = require('../repositories/TeacherRepository')
const courseService = require('../services/CourseService');
const progressService = require('./ProgressService');
const testService = require('./TestService');

class DashboardService {
    async getUserCourseList({ userId, params }) {
        const userCourses = await courseRepository.getUserCourseList({ userId, params });
        // return userCourses

        return await Promise.all(userCourses.map(async ({ course, createdAt: enrolmentDate }) => {
            const { id, name, logo, modules, teachers, userProgress } = course
            const { user: { name: userName, photo }, TeacherCourse, ...authorInfo } = teachers[0].toJSON()
            // console.log(userProgress)
            const progressPercentage = await progressService.calculate(userProgress?.[0])
            const { countLeassons, courseTime } = await courseService.getCountLeassonsAndCourseTime(modules)
            // console.log('progress', progress)
            return {
                id,
                name,
                logo,
                author: { name: userName, photo, ...authorInfo },
                progress: {
                    ...userProgress[0].toJSON(),
                    progressPercentage
                },
                countLeassons,
                courseTime,
                enrolmentDate,
                modules
            }
        }));
    }

    async getUserCourseById({ userId, courseId }) {
        const { course, createdAt: enrolmentDate } = await courseRepository.getUserCourseById({ userId, courseId })
        // return course
        // return userCourse
        const { id, name, logo, modules, teachers, userProgress, test } = course
        // return teachers
        const { user: { name: userName, photo }, TeacherCourse, ...authorInfo } = teachers?.[0]?.toJSON()
        console.log(userProgress)
        const progressPercentage = await progressService.calculate(userProgress?.[0])
        const { countLeassons, courseTime } = await courseService.getCountLeassonsAndCourseTime(modules)
        // console.log('progress', progress)
        return {
            id,
            name,
            logo,
            author: { name: userName, photo, ...authorInfo },
            progress: {
                ...userProgress[0].toJSON(),
                progressPercentage
            },
            countLeassons,
            courseTime,
            enrolmentDate,
            modules,
            test
        }
    }

    async getTeacherCourseList({ userId }) {
        const { id: teacherId } = await teacherRepository.getTeacherByUserId(userId)
        const courseList = await courseRepository.getTeacherCourseList({ teacherId })

        return await Promise.all(courseList.map(async ({ course }) => {
            const { courseUsers, ...courseInfo } = course.toJSON()

            const transformUsers = await Promise.all(courseUsers.map(async (user) => {
                const { userProgress: [userProgress], ...userInfo } = user
                const progressPercentage = await progressService.calculate(userProgress)


                return { ...userInfo, userProgress: { ...userProgress, progressPercentage } }
            }))

            return { ...courseInfo, courseUsers: transformUsers }
        }))
    }

    async getTeacherCourseByCourseId({ userId, courseId }) {
        const { id: teacherId } = await teacherRepository.getTeacherByUserId(userId)

        const teacherCourse = await courseRepository.getTeacherCourseByCourseId({ teacherId, courseId })
        if (!teacherCourse) return null

        const { course: { courseUsers, ...courseInfo } } = teacherCourse.toJSON()

        const transformUsers = await Promise.all(courseUsers.map(async (user) => {
            const { userProgress: [userProgress], ...userInfo } = user
            const progressPercentage = await progressService.calculate(userProgress)
            const testResult = await testService.getUserTestResult({ userId: userInfo.id, courseId })

            return { ...userInfo, userProgress: { ...userProgress, progressPercentage }, testResult }
        }))

        return { ...courseInfo, courseUsers: transformUsers }

    }
}

module.exports = new DashboardService()