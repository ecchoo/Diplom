import styled, { createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
//     body {
//         overflow-y: hidden;
//         padding: 100px;
//     }
// `

export const DashboardContainer = styled.div`
    display: flex;
    width: 100%;
`

export const Content = styled.div`
    display: flex;
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(2)};
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(4)};
    width: 100%;
`

