import { ButtonSubmitForm, FormAuth, AuthSocial } from "@/UI"
import { registerStudent } from "@/api"
import { Input } from "../Input"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { setActiveFormModalAuth, setIsOpenModalAuth, setUser } from "@/store/reducers"
import { convertErrorsValidation } from "@/utils"
import { StatusCodes } from "http-status-codes"
import { GoogleAuth } from "../GoogleAuth"
import { toast } from "react-toastify"
import { GitHubAuth } from "../GitHubAuth"
import { ButtonRegisterTeacher } from "./styled"
import { AUTH_FORMS } from "@/constants"

export const FormRegisterStudent = () => {
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
            const user = await registerStudent(registerData)
            console.log('user', user)
            dispatch(setUser(user))
            dispatch(setIsOpenModalAuth(false))
            toast('Вы успешно зарегистрировались, теперь подтвердите свою почту, письмо уже доставленно')
        } catch (err) {
            if (err?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors)
                setErrorsValidation(convertedErrors)
            }
        }
    }

    const handleRegisterTeacher = () => {
        console.log('click')
        dispatch(setActiveFormModalAuth(AUTH_FORMS.REGISTER_TEACHER))
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
                placeholder='Повторите пароль'
                value={registerData.passwordConfirm}
                onChange={handleChangeInput}
                errorValidation={errorsValidation?.passwordConfirm}
            />
            <ButtonSubmitForm>Зарегистрироваться</ButtonSubmitForm>
            <ButtonRegisterTeacher onClick={handleRegisterTeacher} type="button">Зарегистрироваться как преподаватель</ButtonRegisterTeacher>
            <AuthSocial>
                <GoogleAuth />
                <GitHubAuth />
            </AuthSocial>
        </FormAuth>
    )
}