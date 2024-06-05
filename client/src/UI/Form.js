import styled from "styled-components";

export const Form = styled.form`
    width: 100%;
    border-radius: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing(2, 3, 3, 3)} !important;
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(3)};
`