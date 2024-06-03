import styled from "styled-components";
import { Toolbar as MUIToolBar, AppBar as MUIAppBar } from "@mui/material";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(4)};
    width: 70%;
`;

export const AppBar = styled(MUIAppBar)`
    position: relative;
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

export const ButtonSaveCourse = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    align-self: flex-end;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.accent};
`

