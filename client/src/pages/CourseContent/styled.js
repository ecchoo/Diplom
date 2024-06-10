import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    padding: ${({ theme }) => theme.spacing(4, 30)};
`

export const CourseInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const CourseTitle = styled.h1`
    font-size: 28px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
`

export const CourseDescription = styled.p`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
`

export const Modules = styled.ul`
    padding: ${({ theme }) => theme.spacing(5, 0, 2, 0)};
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(5)};
`

export const Module = styled.li`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const ModuleTitle = styled.h1`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
`

export const ModuleDescription = styled.p`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 16px;
    font-weight: 400;
`

export const Partitions = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const Partition = styled.li`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const PartitionTitle = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 16px;
    font-weight: 600;
`

export const Lessons = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const Lesson = styled.li`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};
    
`

export const LessonTitle = styled.h1`
    color: ${({ theme }) => theme.colors.accent};
    font-size: 16px;
    font-weight: 600;
    /* color: blue; */
`

export const LinkTest = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.accent};
    padding: ${({ theme }) => theme.spacing(1, 3)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.white};
    width: max-content;
`