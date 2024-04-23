import styled from "styled-components"

export const Button = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1.5)};
    display: flex;
    align-items: center;
    width: max-content;
`

export const Arrow = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4ff73;
    border-radius: ${({ theme }) => theme.spacing(1.5)};
    padding: ${({ theme }) => theme.spacing(3)};
    font-size: 30px;
    font-weight: 500;
`

export const ButtonText = styled.h1`
    font-size: 20px;
    opacity: 0.5;
    font-weight: 200;
    padding: 0px ${({ theme }) => theme.spacing(2)};
`