const chatRepository = require('../repositories/ChatRepository')
const messageRepository = require('../repositories/MessageRepository')
const userRepository = require('../repositories/UserRepository')
const chatNotificationRepository = require('../repositories/ChatNotificationRepository')
const { MESSAGE_STATUSES } = require('../constants/messageStatuses')
const { MESSAGE_TYPES } = require('../constants/messageTypes')
const { CHAT_TYPES } = require('../constants/chatTypes')

class ChatService {
    async getUserChatList({ userId, search }) {
        const userChats = await chatRepository.getUserChats(userId)

        const transformUserChats = await Promise.all(userChats.map(async ({ chat }) => {
            const { notifications, chatUsers, ...chatInfo } = chat.toJSON()

            chatInfo.countUsers = chatUsers.length
            chatInfo.countNewMessages = (await messageRepository.getNewMessages({ chatId: chatInfo.id, userId })).length
            chatInfo.lastNotification = notifications?.[0] || null
            chatInfo.lastMessage = await this.getLastChatMessage({ userId, chatId: chatInfo.id })

            if (chatInfo.type === CHAT_TYPES.DEFAULT) {
                const { name, photo } = chatUsers.find(u => u.id !== userId)
                Object.assign(chatInfo, { name, logo: photo })
            }

            return chatInfo
        }))

        if (search && search.length)
            return transformUserChats.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase())
            )

        return transformUserChats
    }

    async getLastChatMessage({ userId, chatId }) {
        const messages = await messageRepository.getChatMessages({ userId, chatId })
        if (!messages.length) return null

        const { message: { id, text }, createdAt } = messages[messages.length - 1].toJSON()
        const { userId: senderId, status, type } = (await messageRepository.getOutgoingMessageById(id)).toJSON()
        const user = await userRepository.getById(senderId)

        return { id, text, status, type, user, createdAt }
    }

    async getChatMessagesAndNotification({ userId, chatId }) {
        const chatMessages = await messageRepository.getChatMessages({ userId, chatId })
        const chatNotifications = await chatNotificationRepository.getChatNotification(chatId)
        const transformMessages = await Promise.all(chatMessages.map(async (chatMessage) => {
            const { message: { text, id }, ...messageInfo } = chatMessage.toJSON()

            return { id, text, ...messageInfo }
        }))

        return { messages: transformMessages, notifications: chatNotifications }
    }

    async sendMessage({ userId, chatId, text, currentChatUsers }) {
        const { id: messageId, createdAt } = await messageRepository.createMessage({ text, chatId })
        const chatUsers = await userRepository.getChatUsers(chatId)
        const { id, name, photo } = await userRepository.getById(userId)
        const readers = []

        await Promise.all(chatUsers.map(async ({ userId: chatUserId }) => {
            const type = chatUserId === userId ? MESSAGE_TYPES.OUTGOING : MESSAGE_TYPES.INCOMING
            let status = MESSAGE_STATUSES.SENT

            if (chatUserId === userId && currentChatUsers.length > 1) {
                status = MESSAGE_STATUSES.READ
            } else if (chatUserId !== userId && currentChatUsers.includes(chatUserId)) {
                status = MESSAGE_STATUSES.READ
                readers.push(chatUserId)
            }

            await messageRepository.createUserMessage({ messageId, userId: chatUserId, status, type })
        }))

        return {
            id: messageId,
            user: { id, name, photo },
            text,
            chatId,
            createdAt,
            readers
        }
    }

    async readNewMessages({ chatId, userId }) {
        const newMessages = await messageRepository.getNewMessages({ chatId, userId })

        await Promise.all(newMessages.map(async newMessage => {
            const outgoingMessage = await messageRepository.getOutgoingMessageById(newMessage.messageId)

            await Promise.all([
                messageRepository.updateUserMessage({
                    ...outgoingMessage.dataValues,
                    status: MESSAGE_STATUSES.READ
                }),
                messageRepository.updateUserMessage({
                    ...newMessage.dataValues,
                    status: MESSAGE_STATUSES.READ
                })
            ])
        }))
    }

    async createCourseChat({ name, type, logo, teachers, courseId }) {
        const chat = await chatRepository.createChat({ name, type, logo })

        await chatRepository.createCourseChat({ courseId, chatId: chat.id })
        await chatNotificationRepository.create({
            text: 'Чат создан',
            chatId: chat.id
        })
        await Promise.all(teachers.map(async ({ id }) => {
            await this.addUserInChat({ userId: id, chatId: chat.id })
        }))

        return chat
    }

    async deleteMessage({ messageId, isForAll }) {
        const { id } = await messageRepository.getOutgoingMessageById(messageId)
        await messageRepository.deleteUserMessage(id)

        if (isForAll) {
            const userMessages = await messageRepository.getUserMessagesByMessageId(messageId)

            for (const { id } of userMessages) {
                await messageRepository.deleteUserMessage(id)
            }
        }
    }

    async addUserInChat({ userId, chatId }) {
        const { name } = await userRepository.getById(userId)

        await chatRepository.createUserChat({ userId, chatId })
        await chatNotificationRepository.create({
            text: `${name} присоединился к чату`,
            chatId: chatId
        })
    }
}

module.exports = new ChatService()