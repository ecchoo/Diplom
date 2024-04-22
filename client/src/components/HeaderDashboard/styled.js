import styled from "styled-components";

export const HeaderDashboardContainer = styled.div`
    display: flex;
`  

export const Search = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: ${({ theme }) => theme.spacing(1.5)};
    background-color: ${({ theme }) => theme.colors.white}
`

