import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    width: 70%;
    flex-direction: ${({ direction }) => direction};
    column-gap: ${({ theme }) => theme.spacing(4)};
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(3)};
`

export const TeacherPhoto = styled.img`
    width: 25%;
    border-radius: 50%;
`

export const TeacherInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1.5)};
    padding: ${({ theme }) => theme.spacing(2, 0)}
`

export const TeacherName = styled.span`
    font-size: 25px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
`

export const TeacherBio = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
`

export const Badges = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    flex-wrap: wrap;

    & .badge:nth-child(even){
        background-color: ${({ theme }) => theme.colors.accent};
    }  
    
    & .badge:nth-child(odd){
        background-color: ${({ theme }) => theme.colors.orange};
    }  
`