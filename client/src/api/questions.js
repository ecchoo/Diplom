import { QUESTIONS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createQuestion = async ({ questionText, testId }) => {
    return await $authHost.post(QUESTIONS_ENDPOINTS.CREATE, { questionText, testId })
}

export const updateQuestion = async ({ id, questionText, testId }) => {
    return await $authHost.put(QUESTIONS_ENDPOINTS.UPDATE, { id, questionText, testId })
}

export const deleteQuestion = async (id) => {
    return await $authHost.delete(QUESTIONS_ENDPOINTS.DELETE, { params: { id } })
}