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

// export const login = async (mail, password) => {
//     const response = await $host.post(UserAPI.LOGIN, {
//         mail,
//         password,
//     });
//     if (response.data.token) {
//         const newToken = response.data.token;
//         localStorage.setItem("token", newToken);
//         return jwtDecode(newToken);
//     } else {
//         throw new Error(response.data.error);
//     }
// };