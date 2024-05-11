import { COURSES_ENDPOINTS } from "@/constants"
import { $host } from "./config"

export const getCourseList = async () => {
    const { data } = await $host.get(COURSES_ENDPOINTS.LIST)

    return data
}

export const getCourseById = async (id) => {
    const { data } = await $host.get(`${COURSES_ENDPOINTS.BY_ID}${id}`)

    return data
}