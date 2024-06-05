const { StatusCodes } = require("http-status-codes");
const partitionRepository = require('../repositories/PartitionRepository')
const { validationResult } = require('express-validator')

class PartitionController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { moduleId, name, description } = req.body
            const newPartition = await partitionRepository.create({ moduleId, name, description })

            return res.status(StatusCodes.CREATED).json({ newPartition })
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

            const { id, name, moduleId, description } = req.body
            const updatedPartition = await partitionRepository.update({ id, name, moduleId, description })

            return res.status(StatusCodes.OK).json({ updatedPartition })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async delete(req, res) {
        try {
            const { query: { id } } = req
            console.log(id)
            const deletedPartition = await partitionRepository.delete(id)

            return res.status(StatusCodes.NO_CONTENT).json({ deletedPartition })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new PartitionController();
