import { Logo } from "../Logo"
import { ButtonLogin, ButtonRegister, Container, HeaderNav, NavActions, NavItem, NavList } from "./styled"

export const Header = () => {
    return (
        <Container>
            <HeaderNav>
                <Logo />
                <nav>
                    <NavList>
                        <NavItem>О нас</NavItem>
                        <NavItem>Курсы</NavItem>
                        <NavItem>Преподаватели</NavItem>
                        <NavItem>Отзывы студентов</NavItem>
                    </NavList>
                </nav>
                <NavActions>
                    <ButtonLogin>Войти</ButtonLogin>
                    <ButtonRegister>Зарегистрироваться</ButtonRegister>
                </NavActions>
            </HeaderNav>
        </Container>
    )
}