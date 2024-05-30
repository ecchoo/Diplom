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
        // return userChats

        const transformUserChats = await Promise.all(userChats.map(async ({ chat }) => {
            const { notifications, lockedUsers, ...chatInfo } = chat.toJSON()

            chatInfo.countNewMessages = (await messageRepository.getNewMessages({ chatId: chatInfo.id, userId })).length
            chatInfo.lastNotification = notifications?.[0] || null
            chatInfo.lastMessage = await this.getLastChatMessage({ userId, chatId: chatInfo.id })
            chatInfo.blocked = lockedUsers?.[0] || null

            if (chatInfo.type === CHAT_TYPES.DEFAULT) {
                const { name, photo } = chatInfo.chatUsers.find(u => u.id !== userId)
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

    async getUserChatById({ userId, chatId }) {
        const { chat: { notifications, ...chatInfo } } = (await chatRepository.getUserChatById({ userId, chatId })).toJSON()

        chatInfo.countNewMessages = (await messageRepository.getNewMessages({ chatId: chatInfo.id, userId })).length
        chatInfo.lastNotification = notifications?.[0] || null
        chatInfo.lastMessage = await this.getLastChatMessage({ userId, chatId: chatInfo.id })

        if (chatInfo.type === CHAT_TYPES.DEFAULT) {
            const { name, photo } = chatInfo.chatUsers.find(u => u.id !== userId)
            Object.assign(chatInfo, { name, logo: photo })
        }

        return chatInfo
    }

    async getLastChatMessage({ userId, chatId }) {
        const messages = await messageRepository.getChatMessagesByUser({ userId, chatId })
        if (!messages.length) return null

        const { message: { id, text }, createdAt } = messages[messages.length - 1].toJSON()
        const { userId: senderId, status, type } = (await messageRepository.getOutgoingMessageById(id)).toJSON()
        const user = await userRepository.getById(senderId)

        return { id, text, status, type, user, createdAt }
    }

    async getChatMessagesAndNotification({ userId, chatId }) {
        const chatMessages = await messageRepository.getChatMessagesByUser({ userId, chatId })
        const chatNotifications = await chatNotificationRepository.getChatNotification(chatId)

        const transformMessages = await Promise.all(chatMessages.map(async (chatMessage) => {
            const { message: { id, text, user: [{ UserMessage, ...userInfo }] }, ...messageInfo } = chatMessage.toJSON()

            return { id, text, ...messageInfo, user: userInfo }
        }))

        return { messages: transformMessages, notifications: chatNotifications }
    }

    async sendMessage({ userId, chatId, text, currentChatUsers }) {
        const readers = []
        const chatUsers = await userRepository.getChatUsers(chatId)

        const { id: messageId, createdAt } = await messageRepository.createMessage({ text, chatId })

        await Promise.all(chatUsers.map(async ({ userId: chatUserId }) => {
            const type = chatUserId === userId ? MESSAGE_TYPES.OUTGOING : MESSAGE_TYPES.INCOMING
            let status = MESSAGE_STATUSES.SENT

            if (chatUserId === userId && currentChatUsers && currentChatUsers.length > 1) {
                status = MESSAGE_STATUSES.READ
            } else if (chatUserId !== userId && currentChatUsers && currentChatUsers.includes(chatUserId)) {
                status = MESSAGE_STATUSES.READ
                readers.push(chatUserId)
            }

            await messageRepository.createUserMessage({ messageId, userId: chatUserId, status, type })
        }))

        const { id, name, photo } = await userRepository.getById(userId)

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
        await Promise.all(teachers.map(async ({ userId }) => {
            await this.addUserInChat({ userId, chatId: chat.id })
        }))

        return chat
    }

    async createChatBetweenUsers({ firstUserId, secondUserId }) {
        const chat = await chatRepository.createChat({ type: CHAT_TYPES.DEFAULT })

        await Promise.all([
            await this.addUserInChat({ userId: firstUserId, chatId: chat.id }),
            await this.addUserInChat({ userId: secondUserId, chatId: chat.id })
        ])

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
        }) //

        const chatMessages = await messageRepository.getChatMessages(chatId)

        for (const chatMessage of chatMessages) {
            const { id: messageId } = chatMessage

            await messageRepository.createUserMessage({
                messageId,
                userId,
                type: MESSAGE_TYPES.INCOMING,
                status: MESSAGE_STATUSES.READ
            })

            const outgoingMessage = await messageRepository.getOutgoingMessageById(messageId)

            if (outgoingMessage.status === MESSAGE_STATUSES.SENT) {
                await messageRepository.updateUserMessage({
                    ...outgoingMessage.dataValues,
                    status: MESSAGE_STATUSES.READ
                })
            }
        }
    }

    async getChatBetweenUsers({ firstUserId, secondUserId }) {
        const firstChatList = await chatRepository.getUserChats(firstUserId)
        // const secondChatList = await chatRepository.getUserChats(secondUserId)

        for (const chatListItem of firstChatList) {
            const { chat } = chatListItem.toJSON()

            const secondUserExists = chat.chatUsers.some(u => u.id === secondUserId)

            if (chat.type === CHAT_TYPES.DEFAULT && secondUserExists) {
                return chat
            }
        }

        return null
    }
}

module.exports = new ChatService()