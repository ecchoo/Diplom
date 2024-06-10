import { Dialog as DialogMUI } from "@mui/material";
import styled from "styled-components";

export const Dialog = styled(DialogMUI)`
    & .MuiDialog-paper {
        max-width: ${({ theme }) => theme.spacing(30)};
        width: 100%;
        padding: ${({ theme }) => theme.spacing(1, 2)};
    }
`

export const DialogTitle = styled.span`
    font-size: 16px;
    padding-bottom: 10px;
`

export const DialogButtons = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
`