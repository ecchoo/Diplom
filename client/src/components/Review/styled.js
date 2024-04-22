import styled from 'styled-components'

export const StyledReview = styled.div`
    background-color: ${({ theme }) => theme.colors.white};;
    border-radius: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(3)};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: ${({ theme }) => theme.spacing(35)};
`

export const Reviewer = styled.div`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const ReviewerInfo = styled.div`
    display: flex;
    flex-direction: column;
`

export const Name = styled.span`
    font-size: 20px;
    font-weight: 500;
`

export const Course = styled.span`
    color: ${({ theme }) => theme.colors.accent};
    font-size: 16px;
    font-weight: 400;
`