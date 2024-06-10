import { Avatar } from "@/UI";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.spacing(2)};
    width: ${({ theme }) => theme.spacing(38)};
    background-color: ${({ theme }) => theme.colors.white};
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CourseLogo = styled.img`
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};
`
export const ButtonActionsCourse = styled.button`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(0.4)};
`

export const Dot = styled.div`
    width: ${({ theme }) => theme.spacing(0.4)};
    height: ${({ theme }) => theme.spacing(0.4)};
    border-radius: ${({ theme }) => theme.spacing(0.6)};
    background-color: ${({ theme }) => theme.colors.gray};
`

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`

export const TitleCourse = styled.h1`
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
`

export const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const AuthorAvatar = styled(Avatar)`
    width: ${({ theme }) => theme.spacing(3)};
    height: ${({ theme }) => theme.spacing(3)};
`

export const AuthorName = styled.h2`
    font-size: 14px;
    font-weight: 400;
`

export const CourseInfo = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(2)};

    & div {
        display: flex;
        align-items: center;
        column-gap: ${({ theme }) => theme.spacing(0.5)};
    }
`

export const CardFooter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

export const Progress = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const WrapperCourseProgressBar = styled.div`
    width: 85%;
`

export const CourseProgressBar = styled(LinearProgress)`
    border-radius: ${({ theme }) => theme.spacing(0.4)};
    background-color: ${({ theme }) => theme.colors.progressBar.primary} !important;

    & span {
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.progressBar.secondary};
    }
`

export const ButtonContinue = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing(1)};
`

