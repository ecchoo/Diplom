import styled from "styled-components";

export const DropZoneContainer = styled.div`
    cursor: pointer;
    border: 2px dashed #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: ${({ theme }) => theme.spacing(2)};
    justify-content: center;
    height: 100%;
    border-radius: ${({ theme }) => theme.spacing(1)};
    text-align: center;
`

export const Placeholder = styled.span`
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.5);
`

export const Preview = styled.img`
    border-radius: 50%;
    width: ${({ theme }) => theme.spacing(10)};
    height: ${({ theme }) => theme.spacing(10)};
`