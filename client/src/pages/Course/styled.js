import styled from "styled-components";

export const Container = styled.div`
    padding: ${({ theme }) => theme.spacing(4, 7)};
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    width: 100%;
`

export const SectionTitle = styled.h1`
    font-size: 30px;
    font-weight: 600;
    width: 100%;
    /* text-align: center; */
`

export const Modules = styled.ul`
    padding-top: ${({ theme }) => theme.spacing(4)};
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: ${({ theme }) => theme.spacing(6)};
`