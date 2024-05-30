import { Dialog as DialogMUI } from "@mui/material";
import styled from "styled-components";


export const Dialog = styled(DialogMUI)`
    & .MuiDialog-paper {
        max-width: ${({ theme }) => theme.spacing(45)};
        width: 100%;
        padding: ${({ theme }) => theme.spacing(2, 2.5)};
        /* height: 400px; */
    }
`

export const DialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const DialogTitle = styled.h1`
    font-size: 20px;
    font-weight: 400;
`

export const DialogContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`

export const Buttons = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: 100%;
`

export const ButtonLock = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.orange};
`

export const ButtonCancel = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.accent};
`