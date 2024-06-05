import { UPLOAD_FILE_ENDPOINT } from "@/constants"
import { $host } from "./config"

export const uploadFile = async ({ file, type }) => {
    const formData = new FormData()
    formData.append('file', file)

    return await $host.post(`${UPLOAD_FILE_ENDPOINT}?type=${type}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}