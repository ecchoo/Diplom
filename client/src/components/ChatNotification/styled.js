import styled from "styled-components";

export const Notification = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(0.5, 1)};
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
    width: max-content;
    align-self: center;
`