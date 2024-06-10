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
    position: relative;
    height: max-content;
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CourseLogo = styled.img`
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};
    border-radius: 50%;
`

export const Actions = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(0.5)};
`

export const ActionList = styled.ul`
    display: ${({ isShow }) => isShow ? 'flex' : 'none'};
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(0.7)};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-bottom: 2px solid #f2f2f2;    
    position: absolute;
    z-index: 2;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const ActionListItem = styled.li`
    font-size: 16px;
    display: flex;
    align-items: center;
    column-gap: 10px;
`

export const ActionIcon = styled.img`
    width: 15px;
    opacity: 0.3;
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

export const CourseInfo = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const CountStudentIcon = styled.img`
    width: ${({ theme }) => theme.spacing(2)};
    opacity: .7;
`

export const CardFooter = styled.div`
    width: 100%;
    display: flex;
    /* column-gap: 140px; */
    align-items: center;
    justify-content: space-between;
`

export const ButtonGo = styled.button`
    background-color: #ffc773;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.white};
    width: 100%;
`

