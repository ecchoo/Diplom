import styled from "styled-components";

export const ButtonSubmitForm = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(0.5, 0)};
    font-size: 20px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.spacing(1.5)};
    width: 100%;
`