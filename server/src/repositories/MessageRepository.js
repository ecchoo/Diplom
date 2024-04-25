const { Message, User } = require('../models')

class MessageRepository {
    async getLastChatMessage(chatId) {
        return await Message.findOne({
            where: { chatId },
            order: [['createdAt', 'DESC']],
            include: {
                model: User,
                as: 'author'
            }
        })
    }
}

module.exports = new MessageRepository()