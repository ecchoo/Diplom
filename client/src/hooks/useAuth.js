import { useSelector } from "react-redux"

export function useAuth() {
    const { user: { token } } = useSelector((state) => state)

    return {
        isAuth: Boolean(token),
    }
}