import { Avatar } from "@/UI";
import styled from "styled-components";

export const MessageContainer = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};

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
    background-color: ${({ isIncoming }) => isIncoming ? '#ffffed' : '#f4edff'};
    font-size: 14px;
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1.5)};
    width: ${({ theme }) => theme.spacing(40)};
    display: flex;
    justify-content: space-between;
`

export const CheckMark = styled.img`
    align-self: flex-end;
`

