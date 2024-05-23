import styled from "styled-components";

export const Container = styled.div`
    padding: ${({ theme }) => theme.spacing(4, 7)};
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    width: 100%;
`

export const SectionTitle = styled.h1`
    font-size: 30px;
    font-weight: 600;
    width: 100%;
    color: ${({ theme }) => theme.colors.primary};

    text-align: center;
`

export const Modules = styled.ul`
    padding-top: ${({ theme }) => theme.spacing(4)};
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: ${({ theme }) => theme.spacing(6)};
`

export const CourseInfo = styled.div`
    display: flex;
    justify-content: space-between;
`

export const CourseOverview = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`

export const CourseTitle = styled.span`
    width: max-content;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 30px;
    font-weight: 600;
`

export const CourseDescription = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
`

export const CourseDetails = styled.div`
    width: 33%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.spacing(2)};
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`

export const CourseDetailsTitle = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    /* text-align: center; */
`

export const ListDetails = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* column-gap: ${({ theme }) => theme.spacing(1)}; */
    row-gap: ${({ theme }) => theme.spacing(1)};

    & .badge:nth-child(even){
        background-color: ${({ theme }) => theme.colors.accent};
    }  
    
    & .badge:nth-child(odd){
        background-color: ${({ theme }) => theme.colors.orange};
    }  
`

export const ListDetailsItem = styled.li`
    width: 45%;
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
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
    font-size: 18px;
`

export const Badges = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    padding-top: ${({ theme }) => theme.spacing(1)};
    flex-wrap: wrap;

    & .badge:nth-child(even){
        background-color: ${({ theme }) => theme.colors.accent};
    }  
    
    & .badge:nth-child(odd){
        background-color: ${({ theme }) => theme.colors.orange};
    }  
`

export const Teachers = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: ${({ theme }) => theme.spacing(4)};
    row-gap: ${({ theme }) => theme.spacing(4)};

    & .card-teacher:nth-child(even){
        align-self: flex-end;
        flex-direction: row-reverse;
    }
`
