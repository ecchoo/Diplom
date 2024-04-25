export const getAuthUser = () => {
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
}