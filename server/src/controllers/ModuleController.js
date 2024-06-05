const { StatusCodes } = require("http-status-codes");
const moduleRepository = require('../repositories/ModuleRepository')
const { validationResult } = require('express-validator')

class ModuleController {
    async create(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { courseId, name, description } = req.body
            const newModule = await moduleRepository.create({ courseId, name, description })

            return res.status(StatusCodes.CREATED).json({ newModule })
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

            const { id, name, description } = req.body
            const updatedModule = await moduleRepository.update({ id, name, description })

            return res.status(StatusCodes.OK).json({ updatedModule })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async delete(req, res) {
        try {
            const { query: { id } } = req
            const deletedModule = await moduleRepository.delete(id)

            return res.status(StatusCodes.NO_CONTENT).json({ deletedModule })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new ModuleController();
