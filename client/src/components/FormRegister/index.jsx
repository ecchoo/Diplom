import { ButtonSubmitForm, FormAuth } from "@/UI"
import { register } from "@/api"
import { Input } from "../Input"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { setIsOpenModalAuth, setUser } from "@/store/reducers"
import { convertErrorsValidation } from "@/utils"
import { StatusCodes } from "http-status-codes"
import { GoogleAuth } from "../GoogleAuth"
import { toast } from "react-toastify"

export const FormRegister = () => {
    const dispatch = useDispatch()

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [errorsValidation, setErrorsValidation] = useState()

    const handleChangeInput = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const user = await register(registerData)
            dispatch(setUser(user))
            dispatch(setIsOpenModalAuth(false))
            toast('Вы успешно зарегистрировались, теперь подтвердите свою почту, письмо уже доставленно')
        } catch (err) {
            if (err.response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors)
                setErrorsValidation(convertedErrors)
            }
        }
    }


    return (
        <FormAuth onSubmit={handleSubmit}>
            <Input
                type='text'
                name='name'
                placeholder='Имя'
                value={registerData.name}
                onChange={handleChangeInput}
                errorValidation={errorsValidation?.name}
            />
            <Input
                type='email'
                name='email'
                placeholder='Email'
                value={registerData.email}
                onChange={handleChangeInput}
                errorValidation={errorsValidation?.email}
            />
            <Input
                type='password'
                name='password'
                placeholder='Пароль'
                value={registerData.password}
                onChange={handleChangeInput}
                errorValidation={errorsValidation?.password}
            />
            <Input
                type='password'
                name='passwordConfirm'
                placeholder='Пароль'
                value={registerData.passwordConfirm}
                onChange={handleChangeInput}
                errorValidation={errorsValidation?.passwordConfirm}
            />
            <ButtonSubmitForm>Зарегистрироваться</ButtonSubmitForm>
            <GoogleAuth />
        </FormAuth>
    )
}