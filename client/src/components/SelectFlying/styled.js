import styled from "styled-components";

export const SelectContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(0.5, 0)};
    background-color: ${({ theme }) => theme.colors.white};
    /* border-radius: ${({ theme, isShow }) => isShow ? theme.spacing(1, 1, 0, 0) : theme.spacing(1)}; */
    width: 100%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);

`

export const SelectControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-radius: ${({ theme }) => theme.spacing(1)}; */
    width: 100%;
    cursor: pointer;

    & span {
        font-weight: 500;
    }

    /* border-bottom: 2px solid rgba(0, 0, 0, 0.5); */
`

export const SelectIcon = styled.img`
    transition: all .2s ease-in-out;
    transform: ${({ isShow }) => isShow && 'rotate(-180deg)'}
`

export const SelectOptions = styled.div`
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    position: absolute;
    right: 0;
    top: ${({ theme }) => theme.spacing(3.3)};
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