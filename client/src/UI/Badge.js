import styled from "styled-components";

export const Badge = styled.span`
    padding: ${({ theme }) => theme.spacing(0.5, 1)};
    width: max-content;
    border-radius: ${({ theme }) => theme.spacing(1.5)};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 300;
`