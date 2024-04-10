const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')

exports.authenticateUser = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'Forbidden' })
    }
}