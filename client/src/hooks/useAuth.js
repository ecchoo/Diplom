import { useSelector } from "react-redux"

export function useAuth() {
    const { user: { token, verified } } = useSelector((state) => state)

    return {
        isAuth: Boolean(token),
        verified
    }
}