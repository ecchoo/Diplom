const chatRepository = require('../repositories/ChatRepository')
const messageRepository = require('../repositories/MessageRepository')
const courseRepository = require('../repositories/CourseRepository')

class DashboardService {
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

    async getUserCourses(userId) {
        // const userCourses = await courseRepository.getUserCourses(userId)
        // return userCourses
    }
}

module.exports = new DashboardService()