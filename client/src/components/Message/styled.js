import { Avatar } from "@/UI";
import styled from "styled-components";

export const MessageContainer = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};
    position: relative;
    flex-direction: ${({ isIncoming }) => isIncoming ? 'row' : 'row-reverse'};

    & .button-actions {
        align-self: center;
    }
`

export const MessageAvatar = styled(Avatar)`
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
    align-self: flex-end;
`

export const MessageBody = styled.div`
    background-color: ${({ isIncoming, theme }) => isIncoming
        ? theme.colors.message.incoming
        : theme.colors.message.outgoing
    };
    
    font-size: 14px;
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1.5)};
    width: ${({ theme }) => theme.spacing(40)};
    display: flex;
    justify-content: space-between;

    & img{
        align-self: flex-end;
    }
`

export const CheckMark = styled.img`
    /* align-self: flex-end; */
`

export const MessageOptions = styled.div`
    position: absolute;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
    display: flex;
    flex-direction: column;
    opacity: 1;
    /* z-index: -1; */
    left: 0;
    bottom: 20px;
    align-self: center;
`

export const MessageActions = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(0.7)};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-bottom: 2px solid #f2f2f2;
`

export const MessageAction = styled.li`
    font-size: 16px;
    display: flex;
    align-items: center;
    column-gap: 10px;
`

export const MessageActionIcon = styled.img`
    width: 15px;
    opacity: 0.3;
`

export const ReadInfo = styled.div`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(0.5)};
    padding: ${({ theme }) => theme.spacing(0.5, 2)};
    font-size: 14px;
    
    & img{
        width: 20px;
    }
`

