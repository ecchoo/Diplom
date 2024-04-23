import styled from 'styled-components'

export const Container = styled.div`
    padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(7)};;
    
`

export const HeaderNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const NavList = styled.ul`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};
`

export const NavItem = styled.li`
    font-size: 16px;
`

export const NavActions = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const ButtonRegister = styled.button`
    border: 2px solid ${({ theme }) => theme.colors.primary}; 
    box-sizing: content-box;
    border-radius: ${({ theme }) => theme.spacing(1.8)};
    background-color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2.5)};
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    font-weight: 400;
    transition: all .2s ease-in-out;

    /* &:hover{
        background-color: #f2f2f2;
        color: #353535;
    } */
`

export const ButtonLogin = styled.button`
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 18px;
    padding: 10px 25px;
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
    transition: all .2s ease-in-out;

    /* &:hover{
        background-color: #353535;
        color: #f2f2f2;
    } */
`