const chatRepository = require('../repositories/ChatRepository')
const messageRepository = require('../repositories/MessageRepository')

class DashboardService {
    async getUserChatList(userId) {
        const userChats = await chatRepository.getUserChats(userId)

        return await Promise.all(userChats.map(async ({ chat }) => {
            const {
                type,
                status,
                createdAt,
                message: { text },
                user
            } = await messageRepository.getLastChatMessage(chat.id);

            const countNewMessages = await messageRepository.getCountNewMessagesInChat(chat.id)

            return {
                ...chat.dataValues,
                countNewMessages,
                lastMessage: { type, status, createdAt, text, user }
            };
        }));
    }
}

module.exports = new DashboardService()