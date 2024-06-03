const { Teacher, User } = require('../models')

class TeacherRepository {
    async list() {
        return await Teacher.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'photo']
            },
            attributes: ['id'],
        })
    }
}

module.exports = new TeacherRepository()