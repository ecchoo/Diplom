const { Op } = require('sequelize')
const { MESSAGE_STATUSES } = require('../constants/messageStatuses')
const { MESSAGE_TYPES } = require('../constants/messageTypes')
const { Message, User, UserMessage, ModerationMessage, Chat } = require('../models')

class MessageRepository {
    async getMessageById(messageId) {
        return await Message.findOne({ where: { id: messageId } })
    }

    async getChatMessages(chatId) {
        return await Message.findAll({ where: { chatId } })
    }

    async getChatMessagesByUser({ userId, chatId }) {
        return await UserMessage.findAll({
            attributes: ['type', 'status', 'createdAt'],
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: Message,
                    as: 'message',
                    where: { chatId },
                    attributes: ['id', 'text'],
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'role', 'photo'],
                        as: 'user',
                        through: {
                            where: { type: MESSAGE_TYPES.OUTGOING }
                        }
                    }
                },
            ],
            where: { userId, deletedAt: null }
        })
    }

    async getUserMessagesByMessageId(messageId) {
        return await UserMessage.findAll({ where: { messageId, deletedAt: null }, attributes: ['id', 'type', 'status'] })
    }

    // async getLastChatMessage({ userId, chatId }) {
    //     return await UserMessage.findOne({
    //         attributes: ['type', 'status', 'createdAt'],
    //         order: [['createdAt', 'DESC']],
    //         where: { type: MESSAGE_TYPES.OUTGOING, deletedAt: null },
    //         include: [
    //             {
    //                 model: Message,
    //                 as: 'message',
    //                 where: { chatId },
    //                 attributes: ['id', 'text'],
    //                 include: {
    //                     model: User,
    //                     attributes: ['id', 'name', 'photo'],
    //                     as: 'user',
    //                     through: {
    //                         attributes: [],
    //                         where: { type: MESSAGE_TYPES.OUTGOING }
    //                     },
    //                 }
    //             },
    //         ],
    //     })
    // }

    async getOutgoingMessageById(messageId) {
        return await UserMessage.findOne({
            where: { type: MESSAGE_TYPES.OUTGOING, messageId },
            attributes: ['id', 'type', 'status', 'messageId', 'userId']
        })
    }

    async getNewMessages({ chatId, userId }) {
        return await UserMessage.findAll({
            where: { status: MESSAGE_STATUSES.SENT, type: MESSAGE_TYPES.INCOMING, userId, deletedAt: null },
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

    async getModerationMessages(moderatorId) {
        return await ModerationMessage.findAll({
            include: [
                {
                    model: Message,
                    as: 'message',
                    attributes: ['id', 'text'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'photo'],
                            as: 'user',
                            through: {
                                attributes: [],
                                where: { type: MESSAGE_TYPES.OUTGOING }
                            },
                        },
                        {
                            model: Chat,
                            as: 'chat',
                            attributes: ['id', 'name', 'type']
                        }
                    ]
                }
            ],
            attributes: ['id', 'createdAt'],
            where: { moderatorId, deletedAt: null }
        })
    }

    async getModerationMessageById(id) {
        return await ModerationMessage.findOne({
            include: [
                {
                    model: Message,
                    as: 'message',
                    attributes: ['id', 'text'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'photo'],
                            as: 'user',
                            through: {
                                attributes: [],
                                where: { type: MESSAGE_TYPES.OUTGOING }
                            },
                        },
                        {
                            model: Chat,
                            as: 'chat',
                            attributes: ['id', 'name', 'type']
                        }
                    ]
                }
            ],
            attributes: ['id', 'createdAt'],
            where: { id }
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

    async createModerationMessage({ messageId, moderatorId }) {
        return await ModerationMessage.create({ messageId, moderatorId })
    }

    async updateUserMessage({ id, messageId, userId, type, status }) {
        return await UserMessage.update({ messageId, userId, type, status }, { where: { id } })
    }

    async deleteUserMessage(id) {
        return await UserMessage.update({ deletedAt: new Date() }, { where: { id } })
    }

    async deleteModerationMessageByMessageId(messageId) {
        return await ModerationMessage.update({ deletedAt: new Date() }, { where: { messageId } })
    }
}

module.exports = new MessageRepository()