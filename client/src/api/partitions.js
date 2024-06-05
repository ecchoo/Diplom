import { PARTITOIONS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createPartition = async ({ name, description, moduleId }) => {
    return await $authHost.post(PARTITOIONS_ENDPOINTS.CREATE, { name, description, moduleId })
}

export const updatePartition = async ({ id, name, moduleId, description }) => {
    return await $authHost.put(PARTITOIONS_ENDPOINTS.UPDATE, { id, name, moduleId, description })
}


export const deletePartition = async (id) => {
    return await $authHost.delete(PARTITOIONS_ENDPOINTS.DELETE, { params: { id } })
}