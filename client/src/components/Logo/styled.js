import styled from "styled-components";

export const StyledLogo = styled.h1`
    font-size: 25px;
    font-weight: 600;
    
    & a {
        color: ${({ theme }) => theme.colors.black}
    }
`