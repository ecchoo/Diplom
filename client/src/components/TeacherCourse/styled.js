import { Select } from "@mui/material";
import styled from "styled-components";

export const TeacherCourseHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Preview = styled.div`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const CourseName = styled.h1`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
`

export const TeacherCourseContainer = styled.div`
    display: flex;
`

export const ButtonTest = styled.button`
    display: flex;
    align-self: flex-end;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-radius: ${({ theme }) => theme.spacing(1)};
`

export const TasksContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(3)};
`

export const SelectTasks = styled(Select)`
    border-radius: ${({ theme }) => theme.spacing(1)} !important;
`