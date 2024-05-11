import { Dialog as DialogMUI, DialogContent as Content } from "@mui/material";
import styled from "styled-components";


export const Dialog = styled(DialogMUI)`
    & [role="dialog"] {
        max-width: ${({ theme }) => theme.spacing(50)};
        width: 100%;
        padding: ${({ theme }) => theme.spacing(2, 2.5, 4, 2.5)};
        display: flex;
        flex-direction: column;
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

export const DialogContent = styled(Content)`
    padding: ${({ theme }) => theme.spacing(3, 0)} !important;
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`

export const Row = styled.div`
    display: flex;
    align-items: self-start;
    justify-content: space-between;
`

export const Description = styled.p`
    width: 60%;
    font-size: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
`

export const CourseLogo = styled.img`
    width: ${({ theme }) => theme.spacing(10)};
    height: ${({ theme }) => theme.spacing(10)};
`

export const ListTeachers = styled.ul`
    padding-top: ${({ theme }) => theme.spacing(2)};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const ListTeachersItem = styled.li`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
    width: 50%;
`

export const Modules = styled.div`
    padding-top: ${({ theme }) => theme.spacing(2)};
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`