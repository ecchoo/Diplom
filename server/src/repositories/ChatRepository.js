const { Sequelize } = require('sequelize')
const { Chat, User, UserChat, Message } = require('../models')

class ChatRepository {
    async getUserChats(userId) {
        return await UserChat.findAll({
            where: {
                userId,
            },
            include: {
                model: Chat,
                as: 'chat',
                include: [
                    {
                        model: User,
                        as: 'chatUsers',
                        attributes: ['id', 'name', 'photo'],
                        through: { attributes: [] },
                        required: false
                    },
                ],
                attributes: ['id', 'name', 'type', 'logo'],
            },
            attributes: [],
        })
    }
}

module.exports = new ChatRepository()