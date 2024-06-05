import { TEACHER_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const getTeacherList = async () => {
    return await $authHost.get(TEACHER_ENDPOINTS.LIST)
}