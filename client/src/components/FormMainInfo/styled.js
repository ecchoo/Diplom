import styled from "styled-components";

export const ButtonSave = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    align-self: flex-end;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.accent};
`