const { MESSAGE_STATUSES } = require('../constants/messageStatuses')
const { MESSAGE_TYPES } = require('../constants/messageTypes')
const { Message, User, UserMessage } = require('../models')

class MessageRepository {
    async getChatMessages(chatId) {
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
                    attributes: ['text'],
                },
            ],
        })
    }

    async getLastChatMessage(chatId) {
        return await UserMessage.findOne({
            attributes: ['type', 'status', 'createdAt'],
            order: [['createdAt', 'DESC']],
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
                    attributes: ['text'],
                },
            ],
        })
    }

    async getCountNewMessagesInChat(chatId) {
        return await UserMessage.count({
            where: { status: MESSAGE_STATUSES.SENT, type: MESSAGE_TYPES.INCOMING },
            include: {
                model: Message,
                as: 'message',
                where: { chatId },
                attributes: []
            }
        })
    }
}

module.exports = new MessageRepository()