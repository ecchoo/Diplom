import { useSelector } from "react-redux"
import { AUTH_FORMS } from "@/constants"
import { FormLogin } from "../FormLogin"
import { FormRegister } from "../FormRegister"
import { FormResetPassword } from "../FormResetPassword"

export const ModalAuthContent = () => {
    const { modalAuth: { activeForm } } = useSelector(state => state)

    switch (activeForm) {
        case AUTH_FORMS.LOGIN: return <FormLogin />
        case AUTH_FORMS.REGISTER: return <FormRegister />
        case AUTH_FORMS.RESET_PASSWORD: return <FormResetPassword />
    }
}