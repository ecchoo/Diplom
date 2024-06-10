import styled from "styled-components";

export const DashboardActivityContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const DashboardActivityHeader = styled.div`
    display: flex;
    padding-bottom: 40px;
`

export const SalutationBlock = styled.div`
    display: flex;
    flex-direction: column;
    /* row-gap: ${({ theme }) => theme.spacing(2)}; */
    width: 40%;
`

export const Offer = styled.span`
    font-size: 40px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
`

export const Descriptor = styled.span`
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`

export const ButtonContinue = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.spacing(2)};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(8)};
    width: max-content;
`

export const ChartContainer = styled.div`

`