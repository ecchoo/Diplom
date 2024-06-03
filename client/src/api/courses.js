import { COURSES_ENDPOINTS } from "@/constants"
import { $authHost, $host } from "./config"

export const getCourseList = async () => {
    const { data } = await $host.get(COURSES_ENDPOINTS.LIST)

    return data
}

export const getCourseById = async (id) => {
    const { data } = await $host.get(`${COURSES_ENDPOINTS.BY_ID}${id}`)

    return data
}

export const enrollCourse = async ({ courseId }) => {
    const { data } = await $authHost.post(COURSES_ENDPOINTS.ENROLL, { courseId })

    return data
}

export const createCourse = async ({ name, description, logo, teachers, authors, modules }) => {
    return await $authHost.post(COURSES_ENDPOINTS.CREATE, {
        name,
        logo,
        teachers,
        authors,
        modules,
        description
    })
}