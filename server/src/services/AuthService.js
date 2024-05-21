const userRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')
const { ROLES } = require('../constants/roles')
const generatePassword = require('../utils/generatePassword')
const mailService = require('./MailService')

class AuthService {
    async register({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10)

        return await userRepository.create({
            name: name,
            password: hashedPassword,
            email: email,
            role: ROLES.STUDENT
        })
    }

    async login({ password, email }) {
        const user = await userRepository.getByEmail(email)

        if (!user) {
            return null
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (isCorrectPassword) {
            return user
        }

        return null
    }

    async verify(userId) {
        return await userRepository.updateUser({ id: userId, verified: true })
    }

    async resetPassword({ userId, email }) {
        const newPassword = generatePassword()
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        await userRepository.updateUser({ id: userId, password: hashedNewPassword })

        return mailService.sendMessage({
            from: 'kosmat3936@gmail.com',
            to: email,
            subject: 'Новый пароль',
            text: newPassword
        })
    }
}

module.exports = new AuthService()