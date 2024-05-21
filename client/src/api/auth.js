import { AUTH_USER_ENDPOINTS } from "@/constants"
import { $host } from "./config"

export const login = async ({ email, password }) => {
    const { data } = await $host.post(AUTH_USER_ENDPOINTS.LOGIN, {
        email, password
    })

    return data
}

export const register = async ({ name, email, password, passwordConfirm }) => {
    const { data } = await $host.post(AUTH_USER_ENDPOINTS.REGISTER, {
        name,
        email,
        password,
        passwordConfirm
    })

    return data
}


export const verifyEmail = async ({ token, email }) => {
    const res = await $host.post(AUTH_USER_ENDPOINTS.VERIFY_EMAIL, {
        token,
        email
    })

    return res
}

export const resetPassword = async (email) => {
    return await $host.post(AUTH_USER_ENDPOINTS.RESET_PASSWORD, { email })
}