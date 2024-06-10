import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Courses = styled.div`
    margin-top: ${({ theme }) => theme.spacing(2)};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: ${({ theme }) => theme.spacing(2)};
    overflow-y: auto;
    height: 610px;

    &::-webkit-scrollbar{
        width: 5px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: ${({ theme }) => theme.colors.gray}
    }

`

export const ButtonCreateCourse = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    align-self: flex-end;
    background-color: ${({ theme }) => theme.colors.accent};
    padding: ${({ theme }) => theme.spacing(1, 4)};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
`