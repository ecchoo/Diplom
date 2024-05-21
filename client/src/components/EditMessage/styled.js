import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
`

export const EditMessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 1, 1, 2)};
    border-bottom: 2px solid ${({ theme }) => theme.colors.background};
`

export const EditMessagePreview = styled.div`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const EditIcon = styled.img`
    width: ${({ theme }) => theme.spacing(2.5)};
`