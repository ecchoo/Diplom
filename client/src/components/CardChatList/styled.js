import styled from "styled-components"

export const Card = styled.div`
    position: relative;
    border-bottom: 2px solid ${({ theme }) => theme.colors.background};
`

export const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    /* background-color: ${({ isSelected, theme }) => isSelected ? theme.colors.gray : theme.colors.white}; */
    opacity: ${({ isBlocked }) => isBlocked ? 0.2 : 1};
    &:hover{
        /* background-color: ${({ theme }) => theme.colors.gray}; */
        cursor: pointer;
    }
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
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const LastMessage = styled.div`
    font-size: 13px;
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(0.5)};
`

export const LastMessageInterlocutor = styled.span`
    color: ${({ theme }) => theme.colors.accent};
`

export const LastMessageText = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
`

export const ChatInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    align-self: flex-start;
`

export const LastMessageInfo = styled.div`
    display: flex;
    align-items: center;   
    column-gap: ${({ theme }) => theme.spacing(0.5)}; 
`

export const CheckMark = styled.img`
    width: 15px;
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

export const Lockout = styled.div`
    /* opacity: .7; */
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({ theme }) => theme.spacing(1)};
    top: 0;
    width: 100%;
    height: 100%;
`

export const LockIcon = styled.img`
    width: ${({ theme }) => theme.spacing(3.5)};
`

export const RemainingTime = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
`