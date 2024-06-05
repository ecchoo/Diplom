const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
const userRepository = require('../../repositories/UserRepository')

const checkRoleMiddleware = (expectedRoles) => async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userRepository.getById(decoded.id)

        if (!expectedRoles.includes(user.role)) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: 'Forbidden' })
        }

        next()
    } catch (error) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'Forbidden' })
    }
}

module.exports = checkRoleMiddleware
