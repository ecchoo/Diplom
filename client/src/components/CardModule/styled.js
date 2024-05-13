import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    width: 100%;
`

export const CardTitle = styled.span`
    width: max-content;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(0.5, 1.5)};
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: ${({ theme }) => theme.spacing(2)};
`


export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: ${({ theme }) => theme.spacing(0.2)};

    & .cardCoursePartition:first-child{
        border-top-right-radius: ${({ theme }) => theme.spacing(3.2)};
        border-top-left-radius: ${({ theme }) => theme.spacing(3.2)};
    }

    & .cardCoursePartition:last-child{
        border-bottom-right-radius: ${({ theme }) => theme.spacing(3.2)};
        border-bottom-left-radius: ${({ theme }) => theme.spacing(3.2)};
    }
`
