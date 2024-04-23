import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        overflow-y: hidden;
    }
`

export const DashboardContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    overflow-y: hidden;
`

export const DashboardContent = styled.div`
    display: flex;
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(2)};
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(4)};
    overflow-y: auto;
    width: 100%;
`

