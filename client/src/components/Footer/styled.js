import styled from "styled-components";

export const StyledFooter = styled.footer`
    padding-top: ${({ theme }) => theme.spacing(5)};
`

export const ContainerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px 70px;
`

export const NavList = styled.ul`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(3)};
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1.5)};
`

export const NavItem = styled.li`
    font-size: 16px;
`

export const SubscribeBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(4)};

    & .button-arrow {
        align-self: flex-end;
    }
`