const chatRepository = require('../repositories/ChatRepository')
const messageRepository = require('../repositories/MessageRepository')

class DashboardService {
    async getUserChatList(userId) {
        const userChats = await chatRepository.getUserChats(userId)

        // console.log(userChats)
        // return userChats

        return await Promise.all(userChats.map(async ({ chat }) => {
            const lastMessage = await messageRepository.getLastChatMessage(chat.id);
            return {
                id: chat.id,
                name: chat.name,
                type: chat.type,
                logo: chat.logo,
                chatUsers: chat.chatUsers,
                newMessages: chat.messages,
                lastMessage: lastMessage
            };
        }));
    }
}

module.exports = new DashboardService()