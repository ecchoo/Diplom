import { useDispatch } from "react-redux"
import { Logo } from "../Logo"
import { setActiveFormModalAuth, setIsOpenModalAuth } from "@/store/reducers"
import { AUTH_FORMS, COURSES, DASHBOARD } from "@/constants"
import { useAuth } from "@/hooks"
import ProfileIcon from '@/assets/icons/profile.svg'
import { ButtonLogin, ButtonRegister, Container, HeaderNav, NavActions, NavItem, NavList } from "./styled"
import { Link } from "react-router-dom"

export const Header = () => {
    const dispatch = useDispatch()
    const { isAuth } = useAuth()

    const handleClickLogin = () => {
        dispatch(setIsOpenModalAuth(true))
        dispatch(setActiveFormModalAuth(AUTH_FORMS.LOGIN))
    }

    const handleClickRegister = () => {
        dispatch(setIsOpenModalAuth(true))
        dispatch(setActiveFormModalAuth(AUTH_FORMS.REGISTER_STUDENT))
    }

    return (
        <Container>
            <HeaderNav>
                <Logo />
                <nav>
                    <NavList>
                        <NavItem>О нас</NavItem>
                        <NavItem><Link to={COURSES}>Курсы</Link></NavItem>
                        <NavItem>Преподаватели</NavItem>
                        <NavItem>Отзывы студентов</NavItem>
                    </NavList>
                </nav>
                {
                    !isAuth ? (
                        <NavActions>
                            <ButtonLogin onClick={handleClickLogin}>Войти</ButtonLogin>
                            <ButtonRegister onClick={handleClickRegister}>Зарегистрироваться</ButtonRegister>
                        </NavActions>
                    ) : (
                        <Link to={DASHBOARD}>
                            <img src={ProfileIcon} alt="Profile icon" />
                        </Link>
                    )
                }
            </HeaderNav>
        </Container>
    )
}