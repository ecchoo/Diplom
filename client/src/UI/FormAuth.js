import styled from "styled-components";

export const FormAuth = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${({ theme }) => theme.spacing(2)};
    row-gap: ${({ theme }) => theme.spacing(3)};
`