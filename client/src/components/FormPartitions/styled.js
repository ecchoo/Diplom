import { TextField, Select as MUISelect } from "@mui/material";
import styled from "styled-components";

export const PartitionAdditionWrapper = styled.div`
    width: 100%;
    border-radius: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing(2, 3, 3, 3)} !important;
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(3)};
`

export const Select = styled(MUISelect)`
    border-radius: 10px !important;

    &::focus-visible *{
        outline: none !important;
    }
`;

export const Row = styled.div`
    display: flex;
    column-gap: 10px;
    /* justify-content: space-between; */
    width: 100%;

    & > * {
        flex: 1;
    }
`

export const PartitionAdditionHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Input = styled(TextField)`
    & .MuiOutlinedInput-root{
        border-radius: ${({ theme }) => theme.spacing(1)} !important;
    } 
`

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Navigation = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const Management = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    align-self: flex-end;
    color: ${({ theme }) => theme.colors.white};
`

const StyledRoundButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.white};
`

export const ButtonAdd = styled(StyledRoundButton)`
    background-color: ${({ theme }) => theme.colors.accent};
    padding: ${({ theme }) => theme.spacing(0.5)};
`

export const ButtonSave = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.accent};
`

export const ButtonDelete = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.orange};

    &:disabled {
        opacity: 0.5;
    }
`

export const ButtonNavigate = styled(StyledRoundButton)`
    background-color: ${({ theme }) => theme.colors.orange};
    
    &:disabled {
        opacity: 0.5;
    }
`