import { COURSES_ENDPOINTS } from "@/constants"
import { $authHost, $host } from "./config"

export const getCourseList = async (params) => {
    const { data } = await $host.get(COURSES_ENDPOINTS.LIST, { params })

    return data
}

export const getCourseById = async (id) => {
    return await $host.get(`${COURSES_ENDPOINTS.BY_ID}${id}`)
}

export const enrollCourse = async ({ courseId }) => {
    const { data } = await $authHost.post(COURSES_ENDPOINTS.ENROLL, { courseId })

    return data
}

export const createCourse = async ({ name, description, logo, difficultyLevel, fieldStudy, teachers, authors }) => {
    return await $authHost.post(COURSES_ENDPOINTS.CREATE, {
        name,
        logo,
        teachers,
        authors,
        description,
        difficultyLevel,
        fieldStudy
    })
}

export const updateCourse = async ({ id, name, description, logo, difficultyLevel, fieldStudy, teachers, authors }) => {
    return await $authHost.put(COURSES_ENDPOINTS.UPDATE, {
        id,
        name,
        logo,
        teachers,
        authors,
        description,
        difficultyLevel,
        fieldStudy
    })
}

export const deleteCourse = async (id) => {
    return await $authHost.delete(COURSES_ENDPOINTS.DELETE, { params: { id } })
}