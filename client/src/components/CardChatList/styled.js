import styled from "styled-components"

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${({ theme }) => theme.spacing(0.1)} solid ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing(1)} 0;
`

export const ChatPreview = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};
`
export const ChatPreviewInfo = styled.div`
    display: flex;
    flex-direction: column;
`
export const Title = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
`

export const LastMessageText = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
`

export const LastMessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Time = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
`

export const NewMessagesCount = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    align-self: flex-end;
    align-items: center;
    font-size: 13px;
    width: 23px;
    height: 23px;
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.accent};
`