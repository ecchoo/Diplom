const { Router } = require('express')
const moderatorController = require('../controllers/ModeratorController')
const authenticateUser = require('../middleware/User/AuthMiddleware')

const moderatorRouter = Router()
moderatorRouter.use(authenticateUser)

moderatorRouter.get('/moderation-messages', moderatorController.getModerationMessages)
// moderatorRouter.post('/lock-user', moderatorController.lockUser)

module.exports = moderatorRouter