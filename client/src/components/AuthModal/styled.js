import { Dialog, DialogContent as Content } from '@mui/material'
import styled from 'styled-components'

export const DialogAuth = styled(Dialog)`
    & [role="dialog"] {
        max-width: ${({ theme }) => theme.spacing(40)};
        width: 100%;
        padding: ${({ theme }) => theme.spacing(2, 2.5, 4, 2.5)};
        display: flex;
        flex-direction: column;
        /* row-gap: ${({ theme }) => theme.spacing(2)}; */
    }
`

export const DialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const AuthModalTitle = styled.h1`
    font-size: 20px;
    font-weight: 400;
`

export const DialogContent = styled(Content)`
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`