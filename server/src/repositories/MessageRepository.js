const { Op } = require('sequelize')
const { MESSAGE_STATUSES } = require('../constants/messageStatuses')
const { MESSAGE_TYPES } = require('../constants/messageTypes')
const { Message, User, UserMessage } = require('../models')

class MessageRepository {
    async getChatMessages({ userId, chatId }) {
        return await UserMessage.findAll({
            attributes: ['type', 'status', 'createdAt'],
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'role', 'photo'],
                },
                {
                    model: Message,
                    as: 'message',
                    where: { chatId },
                    attributes: ['id', 'text'],
                },
            ],
            where: { userId, deletedAt: null }
        })
    }

    async getUserMessagesByMessageId(messageId) {
        return await UserMessage.findAll({ where: { messageId, deletedAt: null }, attributes: ['id', 'type', 'status'] })
    }

    async getLastChatMessage({ userId, chatId }) {
        return await UserMessage.findOne({
            attributes: ['type', 'status', 'createdAt'],
            order: [['createdAt', 'DESC']],
            where: { type: MESSAGE_TYPES.OUTGOING, deletedAt: null },
            include: [
                {
                    model: Message,
                    as: 'message',
                    where: { chatId },
                    attributes: ['id', 'text'],
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'photo'],
                        as: 'user',
                        through: {
                            attributes: [],
                            where: { type: MESSAGE_TYPES.OUTGOING }
                        },
                    }
                },
            ],
        })
    }

    async getOutgoingMessageById(messageId) {
        return await UserMessage.findOne({
            where: { type: MESSAGE_TYPES.OUTGOING, messageId },
            attributes: ['id', 'type', 'status', 'messageId', 'userId']
        })
    }

    async getNewMessages({ chatId, userId }) {
        return await UserMessage.findAll({
            where: { status: MESSAGE_STATUSES.SENT, type: MESSAGE_TYPES.INCOMING, userId },
            include: {
                model: Message,
                as: 'message',
                where: {
                    chatId,
                },
                attributes: []
            },
            attributes: ['id', 'type', 'status', 'messageId', 'userId']
        })
    }

    async createMessage({ text, chatId }) {
        return await Message.create({ text, chatId })
    }

    async updateMessage({ messageId, text }) {
        return await Message.update({ text }, { where: { id: messageId } })
    }

    async createUserMessage({ messageId, userId, type, status }) {
        return await UserMessage.create({ messageId, userId, type, status })
    }

    async updateUserMessage({ id, messageId, userId, type, status }) {
        return await UserMessage.update({ messageId, userId, type, status }, { where: { id } })
    }

    async deleteUserMessage(id) {
        return await UserMessage.update({ deletedAt: new Date() }, { where: { id } })
    }
}

module.exports = new MessageRepository()