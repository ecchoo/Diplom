const { StatusCodes } = require("http-status-codes");
const leassonRepository = require('../repositories/LeassonRepository')
const { validationResult } = require('express-validator')

class LeassonController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { partitionId, name, time, content } = req.body
            const newLeasson = await leassonRepository.create({ partitionId, name, time, content })

            return res.status(StatusCodes.CREATED).json({ newLeasson })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async update(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }
            
            const { id, partitionId, name, time, content } = req.body
            const updatedLeasson = await leassonRepository.update({ id, partitionId, name, time, content })

            return res.status(StatusCodes.CREATED).json({ updatedLeasson })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async delete(req, res) {
        try {
            const { query: { id } } = req
            const deletedLeasson = await leassonRepository.delete(id)

            return res.status(StatusCodes.NO_CONTENT).json({ deletedLeasson })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new LeassonController();
