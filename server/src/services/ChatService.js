const chatRepository = require('../repositories/ChatRepository')
const messageRepository = require('../repositories/MessageRepository')
const userRepository = require('../repositories/UserRepository')
const chatNotificationRepository = require('../repositories/ChatNotificationRepository')
const { MESSAGE_STATUSES } = require('../constants/messageStatuses')
const { MESSAGE_TYPES } = require('../constants/messageTypes')
const { CHAT_TYPES } = require('../constants/chatTypes')

class ChatService {
    async getUserChatList(userId) {
        const userChats = await chatRepository.getUserChats(userId)

        return Promise.all(userChats.map(async ({ chat }) => {
            const { messages, notifications, chatUsers, ...chatInfo } = chat.toJSON()

            chatInfo.countUsers = chatUsers.length
            chatInfo.countNewMessages = (await messageRepository.getNewMessages({ chatId: chatInfo.id, userId })).length
            chatInfo.lastMessage = messages?.[0] || null
            chatInfo.lastNotification = notifications?.[0] || null

            if (chatInfo.type === CHAT_TYPES.DEFAULT) {
                const { name, photo } = chatUsers.find(u => u.id !== userId)
                Object.assign(chatInfo, { name, logo: photo })
            }

            return chatInfo
        }))
    }

    async getChatMessagesAndNotification({ userId, chatId }) {
        const chatMessages = await messageRepository.getChatMessages(userId, chatId)
        const chatNotifications = await chatNotificationRepository.getChatNotification(chatId)

        const transformMessages = await Promise.all(chatMessages.map(async (chatMessage) => {
            const { message: { text }, ...messageInfo } = chatMessage.toJSON()

            return { ...messageInfo, text }
        }))

        return { messages: transformMessages, notifications: chatNotifications }
    }

    async sendMessage(userId, chatId, text) {
        const { id: newMessageId, createdAt } = await messageRepository.createMessage({ text, chatId })
        const chatUsers = await userRepository.getChatUsers(chatId)
        const user = await userRepository.getById(userId)

        await Promise.all(chatUsers.map(async (chatUser) => {
            const type = chatUser.userId === userId ? MESSAGE_TYPES.OUTGOING : MESSAGE_TYPES.INCOMING
            let status = MESSAGE_STATUSES.SENT

            // if(type === MESSAGE_TYPES.OUTGOING && usersInChat.length > 1) status = MESSAGE_STATUSES.READ
            // if(type === MESSAGE_TYPES.INCOMING && usersInChat.includes(chatUser.userId)) status = MESSAGE_STATUSES.READ

            const userMessage = {
                messageId: newMessageId,
                userId: chatUser.userId,
                status,
                type
            }

            await messageRepository.createUserMessage(userMessage)
        }))

        return {
            user,
            text,
            createdAt,
            status: MESSAGE_STATUSES.SENT,
        }
    }

    async readNewMessages(chatId, userId) {
        const newMessages = await messageRepository.getNewMessages(chatId, userId)

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