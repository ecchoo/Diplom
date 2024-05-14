const { ChatNotification } = require('../models')

class ChatNotificationRepository {
    async create({ text, chatId }) {
        return await ChatNotification.create({ text, chatId })
    }
}

module.exports = new ChatNotificationRepository()