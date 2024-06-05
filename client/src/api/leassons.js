import {LEASSONS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createLeasson = async ({ partitionId, name, time, content }) => {
    return await $authHost.post(LEASSONS_ENDPOINTS.CREATE, { partitionId, name, time, content })
}

export const updateLeasson = async ({ id, partitionId, name, time, content }) => {
    return await $authHost.put(LEASSONS_ENDPOINTS.UPDATE, { id, partitionId, name, time, content })
}


export const deleteLeasson = async (id) => {
    return await $authHost.delete(LEASSONS_ENDPOINTS.DELETE, { params: { id } })
}