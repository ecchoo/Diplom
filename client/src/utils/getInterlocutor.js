import { getAuthUser } from "./getAuthUser"

export const getInterlocutor = (chatUser) => {
    const { id } = getAuthUser()
    return chatUser.find(u => u.id !== id)
}