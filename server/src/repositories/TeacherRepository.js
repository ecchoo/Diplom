const { CourseTeacher } = require('../models')

class TeacherRepository {
    async create({ courseId, teacherId }) {
        return await CourseTeacher.create({ courseId, teacherId })
    }

    async update({ id, courseId, teacherId }) {
        return await CourseTeacher.update({ courseId, teacherId }, { where: { id } })
    }
}

module.exports = new TeacherRepository()