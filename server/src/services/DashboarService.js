const chatRepository = require('../repositories/ChatRepository')
const messageRepository = require('../repositories/MessageRepository')

class DashboardService {
    async getUserChatList(userId) {
        const userChats = await chatRepository.getUserChats(userId)
        console.log(userId)
        // return userChats
        return await Promise.all(userChats.map(async ({ chat }) => {
            const {
                type,
                status,
                createdAt,
                message: { text },
                user
            } = await messageRepository.getLastChatMessage(chat.id);
            console.log({
                type,
                status,
                createdAt,
                text,
                user
            })

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