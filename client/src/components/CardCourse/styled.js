import { Avatar } from "@/UI";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardWrapper = styled.div`
    position: relative;
    transition: all .3s ease-in-out;

    & .bgCard {
        width: 100%;
        height: 100%;
        position: absolute;
        background: linear-gradient(197.84deg, rgb(224, 227, 246) 17.882%,rgb(219, 193, 240) 86.804%);
        /* background-color: ${({ theme }) => theme.colors.secondary}; */
        border-radius: ${({ theme }) => theme.spacing(2)};
        z-index: -1;
        transition: all .2s ease-in-out;
    }  
    
    &:hover {
        transform: translateY(${({ theme }) => theme.spacing(-1)});

        & .bgCard {
            transform: rotate(7deg);
        }
    }
`

export const Card = styled.div`
    display: flex;
    max-width: 340px;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.spacing(2)};
    width: ${({ theme }) => theme.spacing(38)};
    background-color: ${({ theme }) => theme.colors.white};

    & .buttonQuickView{
        display: none;
    }

    &:hover .buttonQuickView{
        display: block;
    }
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
    column-gap: ${({ theme }) => theme.spacing(1)};
    /* justify-content: space-between; */

    /* & button, & a {
        width: 50%;
    } */
`


export const ButtonDetail = styled(Link)`
    background-color: #ffc773;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.white};
    width: 100%;
`

export const ButtonEnroll = styled.button`
    background-color: ${({ theme }) => theme.colors.accent};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.white};
    width: 100%;
`

