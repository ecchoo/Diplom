const userRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')
const { ROLES } = require('../constants/roles')
const generatePassword = require('../utils/generatePassword')
const mailService = require('./MailService')

class AuthService {
    async register({ name, email, password, verified, photo }) {
        const hashedPassword = await bcrypt.hash(password, 10)

        return await userRepository.create({
            name: name,
            password: hashedPassword,
            role: ROLES.STUDENT,
            email,
            verified,
            photo
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

    async checkUserExistenceByEmail(email) {
        const user = await userRepository.getByEmail(email)
        return Boolean(user)
    }

    async authWithGoogle({ name, email, photo }) {
        const isExistUser = await this.checkUserExistenceByEmail(email)

        return isExistUser
            ? await userRepository.getByEmail(email)
            : await this.register({
                name,
                photo,
                email,
                password: 'password',
                verified: true,
            })
    }
}

module.exports = new AuthService()