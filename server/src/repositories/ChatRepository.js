const { Op } = require('sequelize')
const { Chat, User, UserChat, Message, CourseChat } = require('../models')

class ChatRepository {
    async getUserChats(userId) {
        return await UserChat.findAll({
            where: {
                userId,
                '$chat.messages.id$': { [Op.ne]: null }
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
                    {
                        model: Message,
                        as: 'messages',
                        attributes: [],
                        required: false,
                    },
                ],
                attributes: ['id', 'name', 'type', 'logo'],
            },
            attributes: [],
        })
    }

    async getCourseChat(courseId) {
        return await CourseChat.findOne({ where: { courseId } })
    }

    async createChat({ name, type, logo }) {
        return await Chat.create({ name, type, logo })
    }

    async createUserChat({ userId, chatId }) {
        return await UserChat.create({ userId, chatId })
    }

    async createCourseChat({ courseId, chatId }) {
        return await CourseChat.create({ courseId, chatId })
    }
}

module.exports = new ChatRepository()