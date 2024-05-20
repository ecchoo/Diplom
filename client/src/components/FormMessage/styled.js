import styled from "styled-components"

export const MessageInput = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: 100%;
`

export const TypeMessage = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    width: 100%;
`

export const ButtonSendMessage = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Input = styled.input`
    width: 100%;
    background-color: transparent;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
`