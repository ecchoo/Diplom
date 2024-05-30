import { Avatar as AvatarUI } from "@/UI";
import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(2, 3)};
`

export const CardHeader = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    /* align-items: center; */
`

export const Avatar = styled(AvatarUI)`
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(0.5)};
`

export const UserName = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
`

export const Date = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    opacity: .5;
`

export const MessageText = styled.p`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary};
`

export const ChatName = styled.span`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.accent};
`

export const CardActions = styled.div`
    display: flex;
    align-self: flex-end;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
`

export const ButtonLockUser = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.orange};
`

export const ButtonShowChat = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.accent};
`