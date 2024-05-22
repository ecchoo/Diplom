import { useState } from "react"
import { Input } from "../Input"
import { ButtonSubmitForm, FormAuth } from "@/UI"
import { resetPassword } from "@/api"
import { useDispatch } from "react-redux"
import { setActiveFormAuthModal } from "@/store/reducers"
import { AUTH_FORMS } from "@/constants"

export const FormResetPassword = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const handleChange = (e) => setEmail(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const res = await resetPassword(email)
            console.log(res)
            dispatch(setActiveFormAuthModal(AUTH_FORMS.LOGIN))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <FormAuth onSubmit={handleSubmit}>
            <Input
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={handleChange}
            />
            <ButtonSubmitForm>Восстановить</ButtonSubmitForm>
        </FormAuth>
    )
}