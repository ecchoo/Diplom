import { verifyEmail } from "@/api"
import { HOME } from "@/constants"
import { StatusCodes } from "http-status-codes"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

export const VerifyEmail = () => {
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