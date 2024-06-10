import { PRACTICAL_TASKS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createPracticalTask = async ({ leassonId, condition, courseId }) => {
    return await $authHost.post(PRACTICAL_TASKS_ENDPOINTS.CREATE, { leassonId, condition, courseId })
}

export const updatePracticalTask = async ({ id, leassonId, condition }) => {
    return await $authHost.put(PRACTICAL_TASKS_ENDPOINTS.UPDATE, { id, leassonId, condition })
}


export const deletePracticalTask = async ({ practicalTaskId, courseId }) => {
    return await $authHost.delete(PRACTICAL_TASKS_ENDPOINTS.DELETE, { params: { practicalTaskId, courseId } })
}

export const submitPracticalTask = async ({ filePath, practicalTaskId, courseId }) => {
    return await $authHost.post(PRACTICAL_TASKS_ENDPOINTS.SUBMIT, { filePath, practicalTaskId, courseId })
}

export const getUserPracticalTasks = async () => {
    return await $authHost.get(PRACTICAL_TASKS_ENDPOINTS.USER_PRACTICAL_TASKS)
}

export const getPracticalTasksTurnedInById = async (id) => {
    return await $authHost.get(`${PRACTICAL_TASKS_ENDPOINTS.PRACTICAL_TASKS_TURNED_IN_BY_ID}${id}`)
}

export const checkUserPracticalTask = async ({ userId, practicalTaskId, mark }) => {
    return await $authHost.put(PRACTICAL_TASKS_ENDPOINTS.CHECK, { userId, practicalTaskId, mark })
}