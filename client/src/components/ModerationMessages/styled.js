import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    /* padding: ${({ theme }) => theme.spacing(0, 10)}; */
`