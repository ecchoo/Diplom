import { MODULES_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createModule = async ({ name, description, courseId }) => {
    return await $authHost.post(MODULES_ENDPOINTS.CREATE, { name, description, courseId })
}

export const updateModule = async ({ id, name, description }) => {
    return await $authHost.put(MODULES_ENDPOINTS.UPDATE, { id, name, description })
}


export const deleteModule = async (id) => {
    return await $authHost.delete(MODULES_ENDPOINTS.DELETE, { params: { id } })
}