import { useState } from "react"
import { Input } from "../Input"
import { login } from "@/api"
import { useDispatch } from "react-redux"
import { setActiveFormModalAuth, setIsOpenModalAuth, setUser } from "@/store/reducers"
import { convertErrorsValidation } from "@/utils"
import { StatusCodes } from 'http-status-codes'
import { ButtonSubmitForm, FormAuth } from "@/UI"
import { ButtonResetPassword, Buttons } from "./styled"
import { AUTH_FORMS } from "@/constants"
import { GoogleAuth } from "../GoogleAuth"

export const FormLogin = () => {
    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [errorsValidation, setErrorsValidation] = useState()

    const handleChangeInput = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleClickResetPassword = () => {
        dispatch(setActiveFormModalAuth(AUTH_FORMS.RESET_PASSWORD))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const user = await login(loginData)
            console.log(user)
            dispatch(setUser(user))
            dispatch(setIsOpenModalAuth(false))
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
                type='email'
                name='email'
                placeholder='Email'
                value={loginData.email}
                onChange={handleChangeInput}
                errorValidation={errorsValidation?.email}
            />
            <Input
                type='password'
                name='password'
                placeholder='Пароль'
                value={loginData.password}
                onChange={handleChangeInput}
                errorValidation={errorsValidation?.password}
            />
            <Buttons>
                <ButtonSubmitForm>Войти</ButtonSubmitForm>
                <ButtonResetPassword onClick={handleClickResetPassword}>
                    Забыли пароль?
                </ButtonResetPassword>
            </Buttons>
            <GoogleAuth />
        </FormAuth>
    )
}