import { ANSWERS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createAnswer = async ({ questionId, answerText, isCorrect }) => {
    return await $authHost.post(ANSWERS_ENDPOINTS.CREATE, { questionId, answerText, isCorrect })
}

export const updateAnswer = async ({ id, questionId, answerText, isCorrect }) => {
    return await $authHost.put(ANSWERS_ENDPOINTS.UPDATE, { id, questionId, answerText, isCorrect })
}

export const deleteAnswer = async (id) => {
    return await $authHost.delete(ANSWERS_ENDPOINTS.DELETE, { params: { id } })
}