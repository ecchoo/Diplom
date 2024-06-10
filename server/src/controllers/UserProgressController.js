const { StatusCodes } = require("http-status-codes");
const userRepository = require('../repositories/UserRepository');

class UserProgressController {
    async update(req, res) {
        try {
            const { userId, body: { courseId, currentLeassonId, currentPracticalTaskId } } = req;
            const updatedProgress = await userRepository.updateUserProgress({ userId, courseId, currentLeassonId, currentPracticalTaskId })

            return res.status(StatusCodes.OK).json({ updatedProgress });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
    }
}

module.exports = new UserProgressController();
