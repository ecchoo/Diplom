import styled from "styled-components";

export const SelectContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1, 2.5)};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme, isShow }) => isShow ? theme.spacing(1, 1, 0, 0) : theme.spacing(1)};
    width: ${({ theme }) => theme.spacing(21)};
`

export const SelectControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: 100%;
    cursor: pointer;

    & span {
        font-weight: 500;
    }
`

export const SelectIcon = styled.img`
    transition: all .2s ease-in-out;
    transform: ${({ isShow }) => isShow && 'rotate(-180deg)'}
`

export const SelectOptions = styled.div`
    position: absolute;
    right: 0;
    top: ${({ theme }) => theme.spacing(4.4)};
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => theme.spacing(0, 0, 1, 1)};
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    overflow-y: auto;
`

export const SelectOption = styled.span`
    padding: ${({ theme }) => theme.spacing(0.5, 2.5)};
    background-color: ${({ theme, isSelected }) => isSelected && theme.colors.gray};
    
    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.gray};
    }
`