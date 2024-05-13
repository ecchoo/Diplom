import styled from "styled-components";

export const Module = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)}
`
export const ModuleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ModuleTitle = styled.h1`
    font-size: 18px;
    font-weight: 500;
`

export const ButtonShow = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.spacing(5)};
    padding: ${({ theme }) => theme.spacing(1)};
    /* background-color: ${({ theme }) => theme.colors.accent}; */
    background-color: #ffc773;
`