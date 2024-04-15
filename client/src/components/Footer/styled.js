import styled from "styled-components";

export const StyledFooter = styled.footer`
    padding-top: 50px;
`

export const ContainerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px 70px;
`

export const NavList = styled.ul`
    display: flex;
    column-gap: 30px;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`

export const NavItem = styled.li`
    font-size: 16px;
`

export const SubscribeBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 40px;

    & .button-arrow {
        align-self: flex-end;
    }
`