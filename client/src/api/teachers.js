import { TEACHER_ENDPOINTS } from "@/constants"
import { $host } from "./config"

export const getTeacherList = async () => {
    return await $host.get(TEACHER_ENDPOINTS.LIST)
}