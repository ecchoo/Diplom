const chatRepository = require('../repositories/ChatRepository')
const messageRepository = require('../repositories/MessageRepository')
const userRepository = require('../repositories/UserRepository')
const { MESSAGE_STATUSES } = require('../constants/messageStatuses')
const { MESSAGE_TYPES } = require('../constants/messageTypes')

class ChatService {
    async getUserChatList(userId) {
        const userChats = await chatRepository.getUserChats(userId)

        return await Promise.all(userChats.map(async ({ chat }) => {
            const { type, status, createdAt, user, message } = await messageRepository.getLastChatMessage(chat.id);
            const countNewMessages = await messageRepository.getCountNewMessagesInChat(chat.id)

            return {
                ...chat.dataValues,
                countNewMessages,
                lastMessage: { text: message.text, type, status, createdAt, user }
            }
        }));
    }

    async getChatMessages(userId, chatId) {
        const chatMessages = await messageRepository.getChatMessages(userId, chatId)

        return await Promise.all(chatMessages.map(async (chatMessage) => ({
            ...chatMessage.dataValues,
            text: chatMessage.message.text
        })))
    }

    async sendMessage(userId, chatId, text) {
        const { id: newMessageId, createdAt } = await messageRepository.createMessage(text, chatId)
        const chatUsers = await userRepository.getChatUsers(chatId)
        const user = await userRepository.getById(userId)

        await Promise.all(chatUsers.map(async (chatUser) => {
            const userMessage = {
                messageId: newMessageId,
                userId: chatUser.userId,
                status: MESSAGE_STATUSES.SENT,
                type: chatUser.userId === userId ? MESSAGE_TYPES.OUTGOING : MESSAGE_TYPES.INCOMING,
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
}

module.exports = new ChatService()