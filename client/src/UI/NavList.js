import styled from "styled-components"

export const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const NavListItem = styled.li`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(1.5)};
    opacity: ${({ isActive }) => isActive ? .8 : 0.5};

    /* & path {
        fill: ${({ isActive, theme }) => isActive ? theme.colors.secondary : theme.colors.primary};
    } */

    & span {
        font-size: 16px;
        font-weight: 600;
        border-bottom: ${({ isActive }) => isActive ? '3px solid #000000' : 'none'};
    }
`