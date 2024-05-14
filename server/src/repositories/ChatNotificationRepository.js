const { ChatNotification } = require('../models')

class ChatNotificationRepository {
    async getChatNotification(chatId) {
        return await ChatNotification.findAll({ where: { chatId }, order: [['id', 'ASC']], })
    }

    async create({ text, chatId }) {
        return await ChatNotification.create({ text, chatId })
    }
}

module.exports = new ChatNotificationRepository()