import styled from "styled-components";
import { Toolbar as MUIToolBar, AppBar as MUIAppBar, Select as MUISelect } from "@mui/material";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(4)};
    width: 70%;
`;

export const AppBar = styled(MUIAppBar)`
    position: relative !important;
`

export const Toolbar = styled(MUIToolBar)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 4)} !important;
`;

export const DialogContent = styled.div`
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(4, 0)} !important;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Select = styled(MUISelect)`
    border-radius: 10px !important;

    &::focus-visible *{
        outline: none !important;
    }
`;

export const Questions = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

// export const Question = styled.div`
//     display: flex;
//     flex-direction: column;
//     row-gap: ${({ theme }) => theme.spacing(2)};
// `

export const Answers = styled.div`
    padding-top: ${({ theme }) => theme.spacing(3)};
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const Buttons = styled.div`
    display: flex;
    /* align-self: flex-end; */
    justify-content: end;
    column-gap: ${({ theme }) => theme.spacing(1)};
    padding-top: ${({ theme }) => theme.spacing(1)};
`

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    align-self: flex-end;
    color: ${({ theme }) => theme.colors.white};

    &:disabled{
        opacity: 0.5;
    }
`

export const ButtonAdd = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.accent};
`

export const ButtonDelete = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.orange};
`

export const ButtonSaveTest = styled(StyledButton)`
    background-color: ${({ theme }) => theme.colors.accent};
`


