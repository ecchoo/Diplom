import styled from "styled-components";

export const GitHubAuthButton = styled.button`
    border: 1px solid #dadce0;
    padding: ${({ theme }) => theme.spacing(0.7)};
    border-radius: ${({ theme }) => theme.spacing(0.4)};
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(1)};
    /* font-size: 16px; */

    &:hover{
        background-color: #f8faff;
    }
`