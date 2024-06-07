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
    padding-top: ${({ theme }) => theme.spacing(2)};
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

export const ButtonSend = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.accent};

    &:disabled{
        opacity: .5;
    }
`

export const ButtonCancel = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.orange};
`

export const DropZoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100px;
`

export const DropZone = styled.div`
    cursor: pointer;
    border: 2px dashed #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: ${({ theme }) => theme.spacing(2)};
    justify-content: center;
    height: 100%;
    border-radius: ${({ theme }) => theme.spacing(1)};
    text-align: center;
`

export const Placeholder = styled.span`
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.5);
`

export const Preview = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
`