import styled from "styled-components";

export const Container = styled.div`
    display: flex;
`

export const Courses = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(2)};
`

export const ButtonCreateCourse = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
`