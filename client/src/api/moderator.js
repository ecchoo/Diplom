import { MODERATOR_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const getModerationMessages = async () => {
    return await $authHost.get(MODERATOR_ENDPOINTS.MODERATION_MESSAGES)
}