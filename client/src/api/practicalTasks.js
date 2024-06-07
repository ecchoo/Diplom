import { PRACTICAL_TASKS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createPracticalTask = async ({ leassonId, condition }) => {
    return await $authHost.post(PRACTICAL_TASKS_ENDPOINTS.CREATE, { leassonId, condition })
}

export const updatePracticalTask = async ({ id, leassonId, condition }) => {
    return await $authHost.put(PRACTICAL_TASKS_ENDPOINTS.UPDATE, { id, leassonId, condition })
}


export const deletePracticalTask = async (id) => {
    return await $authHost.delete(PRACTICAL_TASKS_ENDPOINTS.DELETE, { params: { id } })
}

export const submitPracticalTask = async ({ filePath, practicalTaskId }) => {
    return await $authHost.post(PRACTICAL_TASKS_ENDPOINTS.SUBMIT, { filePath, practicalTaskId })
}

export const getUserPracticalTasks = async () => {
    return await $authHost.get(PRACTICAL_TASKS_ENDPOINTS.USER_PRACTICAL_TASKS)
}