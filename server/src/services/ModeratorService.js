const messageRepository = require("../repositories/MessageRepository")
const userRepository = require("../repositories/UserRepository")

class ModeratorService {
    async getModerationMessages(moderatorId) {
        const moderationMessages = await messageRepository.getModerationMessages(moderatorId)
        // return moderationMessages
        return await Promise.all(moderationMessages.map(moderationMessage => {
            const { message: { chat, user: [user], ...messageInfo }, ...moderationMessageInfo } = moderationMessage.toJSON()
            return { ...moderationMessageInfo, message: messageInfo, user, chat }
        }))
    }

    async getModerationMessageById(id) {
        const {
            message: {
                chat,
                user: [user],
                ...messageInfo
            },
            ...moderationMessageInfo
        } = (await messageRepository.getModerationMessageById(id)).toJSON()

        return { ...moderationMessageInfo, message: messageInfo, user, chat }
    }

    async createModerationMessage({ messageId, moderatorId }) {
        const newModeratorMessage = await messageRepository.createModerationMessage({ messageId, moderatorId })

        return await this.getModerationMessageById(newModeratorMessage.id)
    }

    async lockUser({ moderatorId, chatId, userId, messageId, reason, duration }) {
        await messageRepository.deleteModerationMessageByMessageId(messageId)
        return await userRepository.createLockedUser({ chatId, userId, moderatorId, reason, duration })
    }

    // async addModeratorInChat(chatId) {
    //     const moderators = await userRepository.getModerators()
    // }
}

module.exports = new ModeratorService()