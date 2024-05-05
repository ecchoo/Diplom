import { Select } from "@mui/material";
import styled from "styled-components";

export const CoursesContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const CoursesHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CoursesTitle = styled.h1`
    font-size: 25px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
`

export const CoursesManagement = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(0.5)};
`

export const SortCourses = styled.div`
    display: flex;
    padding: ${({ theme }) => theme.spacing(1.5)};
    background-color: ${({ theme }) => theme.colors.white};
    column-gap: ${({ theme }) => theme.spacing(2)};
`

export const SortPlaceholder  = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
    opacity: .5;
`

export const SortSelect = styled(Select)`
    position: relative;
    display: flex;
    flex-direction: column;
`

export const SortSelectHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CoursesBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    gap: ${({ theme }) => theme.spacing(2)};
`