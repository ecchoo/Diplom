import styled from "styled-components";

export const ChatContainer = styled.div`
    width: 64%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: hidden;
`

export const ChatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1.5)};
    padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2)};
`

export const ChatInfo = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};
`

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
`

export const SubTitle = styled.span`
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
    /* justify-content: end; // вот это */
    height: 450px;
    overflow-y: auto;
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