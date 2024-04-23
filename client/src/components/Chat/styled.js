import styled from "styled-components";

export const ChatContainer = styled.div`
    width: 64%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ChatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1.5)};
    padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2)};
`

export const User = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};
`

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`

export const UserName = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
`

export const Status = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
`

export const ChatActions = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1.5)};
`

export const Messages = styled.div`
    padding: ${({ theme }) => theme.spacing(3)} 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;
    row-gap: ${({ theme }) => theme.spacing(3)};
`

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

export const Input = styled.input`
    width: 100%;
    background-color: transparent;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
`