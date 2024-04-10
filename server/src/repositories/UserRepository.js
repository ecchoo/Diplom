const { User } = require('../models')

class UserRepository {
    async getByEmail(email) {
        return User.findOne({ where: { email } })
    }

    async create({ name, email, password, role }) {
        return await User.create({ name, email, password, role })
    }
}

module.exports = new UserRepository()