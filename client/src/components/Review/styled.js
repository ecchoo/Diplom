import styled from 'styled-components'

export const StyledReview = styled.div`
    background-color: #fff;
    border-radius: 20px;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 350px;
`

export const Reviewer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`

export const ReviewerInfo = styled.div`
    display: flex;
    flex-direction: column;
    /* row-gap: 5px; */
`

export const Name = styled.span`
    font-size: 20px;
    font-weight: 500;
`

export const Course = styled.span`
    color: #c19cf6;
    font-size: 16px;
    font-weight: 400;
`