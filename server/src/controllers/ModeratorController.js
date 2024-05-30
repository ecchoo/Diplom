const { StatusCodes } = require('http-status-codes')
const moderatorService = require('../services/ModeratorService')

class ModeratorController {
    async getModerationMessages(req, res) {
        try {
            const { userId: moderatorId } = req

            const moderationMessages = await moderatorService.getModerationMessages(moderatorId)
            return res.status(StatusCodes.OK).json({ moderationMessages })
        } catch (err) {
            console.log(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }

    // async lockUser(req, res) {
    //     try {
    //         const {
    //             userId: moderatorId,
    //             body: { messageId, userId, accompanyingText, reason, duration }
    //         } = req

    //         const result = await moderatorService.lockUser({ moderatorId, messageId, userId, accompanyingText, reason, duration })
    //         return res.status(StatusCodes.OK).json({ result })
    //     } catch (err) {
    //         console.log(err)
    //         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    //     }
    // }
}

module.exports = new ModeratorController()