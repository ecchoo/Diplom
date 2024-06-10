import styled from "styled-components";

export const Container = styled.div`
    padding: ${({ theme }) => theme.spacing(4, 30)};
`

export const Title = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 25px;
    font-weight: 600;
`

export const Questions = styled.ul`
    padding: ${({ theme }) => theme.spacing(4, 0, 2, 0)};
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(4)};
`

export const Question = styled.li`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const QuestionText = styled.p`
    font-size: 20px;
`

export const Answers = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const ButtonSubmit = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.accent};
    padding: ${({ theme }) => theme.spacing(1, 3)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.white};
    width: max-content;
`