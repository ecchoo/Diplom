import { PROGRESS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const updateProgress = async ({ courseId, currentLeassonId, currentPracticalTaskId }) => {
    return await $authHost.put(PROGRESS_ENDPOINTS.UPDATE, { courseId, currentLeassonId, currentPracticalTaskId })
}