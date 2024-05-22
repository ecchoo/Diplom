import styled from "styled-components";

export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: ${({ theme }) => theme.spacing(1)};
`

export const ButtonResetPassword = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(0.5, 0)};
    font-size: 16px;
    font-weight: 300;
    /* color: ${({ theme }) => theme.colors.white}; */
    /* background-color: ${({ theme }) => theme.colors.primary}; */
    /* border-radius: ${({ theme }) => theme.spacing(1.5)}; */
    width: 100%;
`