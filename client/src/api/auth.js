import { AUTH_USER_ENDPOINTS } from "@/constants"
import { $host } from "./config"

export const login = async ({ email, password }) => {
    const { data } = await $host.post(AUTH_USER_ENDPOINTS.LOGIN, {
        email, password
    })

    return data
}

export const registerStudent = async ({ name, email, password, passwordConfirm }) => {
    const { data } = await $host.post(AUTH_USER_ENDPOINTS.REGISTER_STUDENT, {
        name,
        email,
        password,
        passwordConfirm
    })

    return data
}

export const registerTeacher = async ({ name, email, password, passwordConfirm, bio, yearsExperience }) => {
    console.log('reg teacher')
    const { data } = await $host.post(AUTH_USER_ENDPOINTS.REGISTER_TEACHER, {
        name,
        email,
        password,
        passwordConfirm,
        bio,
        yearsExperience
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

export const authWithGoogle = async (credential) => {
    return await $host.post(AUTH_USER_ENDPOINTS.GOOGLE, { credential })
}

export const authWithGitHub = async (code) => {
    return await $host.post(AUTH_USER_ENDPOINTS.GITHUB, { code })
}