import { FILE_ENDPOINTS } from "@/constants"
import { $authHost, $host } from "./config"

export const uploadFile = async ({ file, type }) => {
    const formData = new FormData()
    formData.append('file', file)

    return await $host.post(`${FILE_ENDPOINTS.UPLOAD}?type=${type}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const downloadFile = async (fileName) => {
    return await $authHost.get(`${FILE_ENDPOINTS.DOWNLOAD}${fileName}`)
}