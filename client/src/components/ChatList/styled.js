import styled from "styled-components";

export const ChatListContainer = styled.div`
    width: 35%;
    padding: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.white}; 
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.spacing(1.5)};
`

export const ChatSearch = styled.div`
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({ theme }) => theme.spacing(1)};
    background-color: ${({ theme }) => theme.colors.background}
`

export const ChatSearchInput = styled.input`
    width: 80%;
    background-color: transparent;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
`

export const ChatSearchIcon = styled.img`
    width: ${({ theme }) => theme.spacing(2)};
    height: ${({ theme }) => theme.spacing(2)};
`

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${({ theme }) => theme.spacing(0.1)} solid ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing(1)} 0;
`

export const ListItemUser = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};
`
export const UserMessage = styled.div`
    display: flex;
    flex-direction: column;
`
export const UserName = styled.span`
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