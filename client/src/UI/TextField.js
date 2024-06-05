import { TextField as MUITextField } from '@mui/material'
import styled from 'styled-components'

export const TextField = styled(MUITextField)`
    & .MuiOutlinedInput-root{
        border-radius: ${({ theme }) => theme.spacing(1)} !important;
    } 
`