import { TESTS_ENDPOINTS } from "@/constants"
import { $authHost } from "./config"

export const createTest = async ({ name, courseId, questions }) => {
    return await $authHost.post(TESTS_ENDPOINTS.CREATE, { name, courseId, questions })
}

export const updateTest = async ({ id, name, courseId, questions }) => {
    return await $authHost.put(TESTS_ENDPOINTS.UPDATE, { id, name, courseId, questions })
}

export const deleteTest = async (id) => {
    return await $authHost.delete(TESTS_ENDPOINTS.DELETE, { params: { id } })
}

export const getTestById = async (id) => {
    return await $authHost.get(`${TESTS_ENDPOINTS.BY_ID}${id}`)
}

export const submitTest = async ({ testId, userAnswers }) => {
    return await $authHost.post(TESTS_ENDPOINTS.SUBMIT, { testId, userAnswers })
}

