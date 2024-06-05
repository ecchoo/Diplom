const userRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')
const { ROLES } = require('../constants/roles')
const generatePassword = require('../utils/generatePassword')
const mailService = require('./MailService')
const axios = require('axios')
const { URLS } = require('../constants/urls')


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

    async authWithGitHub(code) {
        const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
        const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


        const { data: { access_token } } = await axios.post(URLS.GITHUB_ACCESS_TOKEN, null, {
            headers: {
                'Accept': 'application/json'
            },
            params: {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code,
            }
        });

        const { data: { login, avatar_url } } = await axios.get(URLS.GITHUB_USER, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json'
            }
        });

        const existsUser = await userRepository.getByName(login)

        if (existsUser && !existsUser.email) {
            return existsUser
        }
        //
        if (!existsUser) {
            return await this.register({
                name: login,
                photo: avatar_url,
                password: 'password',
                verified: true,
            })
        }
    }
}

module.exports = new AuthService()