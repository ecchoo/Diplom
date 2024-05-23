import { verifyEmail } from "@/api"
import { HOME } from "@/constants"
import { setVerified } from "@/store/reducers"
import { StatusCodes } from "http-status-codes"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

export const VerifyEmail = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { user: { email } } = useSelector(state => state)

    useEffect(() => {
        const fetchVerifyEmail = async () => {
            const queryParams = new URLSearchParams(location.search)
            const token = queryParams.get('token')

            try {
                const { data, status } = await verifyEmail({ token, email })
                if (status === StatusCodes.OK) {
                    dispatch(setVerified(true))
                    navigate(HOME)
                }
            } catch (err) {
                console.log(err)
            }

        }

        fetchVerifyEmail()
    }, [])

    return (
        <>
            {email}
        </>
    )
}