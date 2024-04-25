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