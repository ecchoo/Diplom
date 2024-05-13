import styled from "styled-components";

export const CourseList = styled.div`
    padding: ${({ theme }) => theme.spacing(4, 7)};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: ${({ theme }) => theme.spacing(0.5)};
`