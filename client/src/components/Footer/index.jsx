import { Title2 } from "@/UI"
import { Column, ContainerFooter, NavItem, NavList, StyledFooter, SubscribeBlock } from "./styled"
import { ButtonArrow } from "../ButtonArrow"
import { Logo } from "../Logo"

export const Footer = () => {
    return (
        <StyledFooter>
            <ContainerFooter>
                <Logo />
                <nav>
                    <NavList>
                        <Column>
                            <NavItem>О нас</NavItem>
                            <NavItem>Курсы</NavItem>
                        </Column>
                        <Column>
                            <NavItem>Преподаватели</NavItem>
                            <NavItem>Отзывы студентов</NavItem>
                        </Column>
                    </NavList>
                </nav>
                <SubscribeBlock>
                    {/* <Title2>Подписаться, чтобы не пропустить</Title2> */}
                    <ButtonArrow
                        text='Подписаться на рассылку'
                    />
                </SubscribeBlock>
            </ContainerFooter>
        </StyledFooter>
    )
}