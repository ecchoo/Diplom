import { useSelector } from "react-redux"
import { AUTH_FORMS } from "@/constants"
import { FormLogin } from "../FormLogin"
import { FormRegisterStudent } from "../FormRegisterStudent"
import { FormResetPassword } from "../FormResetPassword"
import { FormRegisterTeacher } from "../FormRegisterTeacher"

export const ModalAuthContent = () => {
    const { modalAuth: { activeForm } } = useSelector(state => state)
    console.log('activeForm', activeForm)
    switch (activeForm) {
        case AUTH_FORMS.LOGIN: return <FormLogin />
        case AUTH_FORMS.REGISTER_STUDENT: return <FormRegisterStudent />
        case AUTH_FORMS.RESET_PASSWORD: return <FormResetPassword />
        case AUTH_FORMS.REGISTER_TEACHER: return <FormRegisterTeacher />
    }
}