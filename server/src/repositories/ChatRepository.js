const { Op, Sequelize, where } = require('sequelize')
const { Chat, User, UserChat, Message, CourseChat, ChatNotification, LockedUser } = require('../models')
const { MESSAGE_TYPES } = require('../constants/messageTypes')

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
                    {
                        model: ChatNotification,
                        as: 'notifications',
                        order: [['createdAt', 'DESC']],
                        limit: 1
                    },
                    {
                        model: LockedUser,
                        as: 'lockedUsers',
                        where: { userId, deletedAt: null },
                        required: false
                    }
                ],
                attributes: ['id', 'name', 'type', 'logo'],
            },
            attributes: [],
        })
    }

    async getUserChatById({ userId, chatId }) {
        return await UserChat.findOne({
            where: {
                userId,
            },
            include: {
                model: Chat,
                as: 'chat',
                where: { id: chatId },
                include: [
                    {
                        model: User,
                        as: 'chatUsers',
                        attributes: ['id', 'name', 'photo'],
                        through: { attributes: [] },
                        required: false
                    },
                    {
                        model: ChatNotification,
                        as: 'notifications',
                        order: [['createdAt', 'DESC']],
                        limit: 1
                    }
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