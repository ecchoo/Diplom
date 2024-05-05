import { DASHBOARD_ENDPOINTS } from "@/constants/dashboardEndPoints"
import { $authHost } from "./config"

export const getChatList = async () => {
    const { data } = await $authHost.get(DASHBOARD_ENDPOINTS.CHAT_LIST)

    return data
}

export const getUserCourseList = async (params) => {
    const { data } = await $authHost.get(DASHBOARD_ENDPOINTS.COURSE_LIST, { params })

    return data
}