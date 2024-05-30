import { DASHBOARD_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const getChatList = async (params) => {
    const { data } = await $authHost.get(DASHBOARD_ENDPOINTS.CHAT_LIST, { params })

    return data
}

export const getUserCourseList = async (params) => {
    const { data } = await $authHost.get(DASHBOARD_ENDPOINTS.COURSE_LIST, { params })

    return data
}