import styled from 'styled-components'

export const Container = styled.div`
    padding: 40px 70px;
`

export const HeaderNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const NavList = styled.ul`
    display: flex;
    column-gap: 20px;
`

export const NavItem = styled.li`
    font-size: 16px;
`

export const NavActions = styled.div`
    display: flex;
    column-gap: 10px;
`

export const ButtonRegister = styled.button`
    border: 2px solid #353535;
    box-sizing: content-box;
    border-radius: 18px;
    background-color: #353535;
    padding: 10px 25px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    transition: all .2s ease-in-out;

    &:hover{
        background-color: #f2f2f2;
        color: #353535;
    }
`

export const ButtonLogin = styled.button`
    border: 2px solid #353535;
    border-radius: 18px;
    border-color: #353535;
    padding: 10px 25px;
    font-size: 16px;
    font-weight: 400;
    color: #353535;
    transition: all .2s ease-in-out;

    &:hover{
        background-color: #353535;
        color: #f2f2f2;
    }
`