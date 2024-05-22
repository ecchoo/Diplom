import { authWithGoogle } from "@/api"
import { setIsOpenAuthModal, setUser } from "@/store/reducers"
import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"

export const GoogleAuth = () => {
    const dispatch = useDispatch()

    const handleSuccess = async ({ credential }) => {
        try {
            const { data } = await authWithGoogle(credential)
            dispatch(setUser(data))
            dispatch(setIsOpenAuthModal(false))
        } catch (err) {
            console.log(err)
        }
    }

    const handleError = () => {
        console.log('Failed login')
    }

    return <GoogleLogin
        theme=""
        onSuccess={handleSuccess}
        onError={handleError}
    />
}