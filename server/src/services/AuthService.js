const userRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')
const { ROLES } = require('../constants/roles')

class AuthService {
    async registerUser({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10)

        return await userRepository.create({
            name: name,
            password: hashedPassword,
            email: email,
            role: ROLES.STUDENT
        })
    }

    async loginUser({ password, email }) {
        const user = await userRepository.getByEmail(email)

        if (!user) {
            return null
        }

        const isCorrectPassword = bcrypt.compare(password, user.password)

        if (isCorrectPassword) {
            return user
        }

        return null
    }
}

module.exports = new AuthService()