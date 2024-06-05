const { StatusCodes } = require("http-status-codes");
const courseRepository = require("../repositories/CourseRepository");
const courseService = require("../services/CourseService");
const { validationResult } = require('express-validator')

class CourseController {
    async list(req, res) {
        try {
            const courseList = await courseService.getCourseList()

            return res.status(StatusCodes.OK).json({ courses: courseList })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async index(req, res) {
        try {
            const { id: courseId } = req.params
            const course = await courseService.getCourseById(courseId)

            return res.status(StatusCodes.OK).json({ course })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async create(req, res) {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorsValidation.array() })
            }

            const { name, description, logo, teachers } = req.body
            const newCourse = await courseService.createCourse({ name, description, logo, teachers })

            return res.status(StatusCodes.CREATED).json({ newCourse })
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

            const { id, name, description, logo, teachers } = req.body
            const updatedCourse = await courseService.updateCourse({ id, name, description, logo, teachers })

            return res.status(StatusCodes.OK).json(updatedCourse)
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async delete(req, res) {
        try {
            const { id: courseId } = req.body
            const deletedCourse = await courseRepository.delete(courseId)

            return res.status(StatusCodes.NO_CONTENT).json({ course: deletedCourse })
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    async enroll(req, res) {
        try {
            const { userId, body: { courseId } } = req
            console.log(userId, courseId)
            const result = await courseService.enrollCourse({ userId, courseId })

            return res.status(StatusCodes.OK).json({ result })
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

module.exports = new CourseController();
