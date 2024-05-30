import { Dialog as DialogMUI } from "@mui/material";
import styled from "styled-components";


export const Dialog = styled(DialogMUI)`
    & .MuiDialog-paper {
        max-width: ${({ theme }) => theme.spacing(50)};
        width: 100%;
    }
`

export const DialogContainer = styled.div`
    width: 100%;
    padding: ${({ theme }) => theme.spacing(0, 0, 0, 2.5)};
    display: flex;
    flex-direction: column;
    max-height: 600px;
    overflow-y: auto;
    /* height: 10px; */
`

export const DialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: ${({ theme }) => theme.spacing(0)};
`

export const DialogTitle = styled.h1`
        font-size: 20px;
        font-weight: 400;
    `

export const DialogContent = styled.div`
        padding: ${({ theme }) => theme.spacing(2, 2.5, 2, 0)} !important;
        display: flex;
        flex-direction: column;
        row-gap: ${({ theme }) => theme.spacing(1.5)};
        overflow-y: auto;

        &::-webkit-scrollbar{
            width: 5px;
        }
       
        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
        
        &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: ${({ theme }) => theme.colors.gray}
        }
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