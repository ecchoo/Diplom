import styled from "styled-components";

export const Button = styled.button`
    display: flex;
    flex-direction: ${({ direction }) => direction};
    gap: ${({ theme }) => theme.spacing(0.4)};
`

export const Dot = styled.div`
    width: ${({ theme }) => theme.spacing(0.4)};
    height: ${({ theme }) => theme.spacing(0.4)};
    border-radius: ${({ theme }) => theme.spacing(0.6)};
    background-color: ${({ theme }) => theme.colors.gray};
`