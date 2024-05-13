import styled from "styled-components";

export const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    max-height: ${({ theme, isOpen }) => isOpen ? '1000px' : theme.spacing(12)};
    padding: ${({ theme }) => theme.spacing(3.2)};
    transition: all 300ms ease-in-out;
    overflow-y: hidden;
    cursor: pointer;

    &:hover{
        /* background-color: ${({ theme }) => theme.colors.gray}; */
        background-color: #ebebeb;
        & button{
            background-color: ${({ theme }) => theme.colors.white};
        }
    }
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CardPreview = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(0.5)};
`

export const CardTitle = styled.span`
    font-size: 24px;
    font-weight: 500;
`

export const CardSubTitle = styled.span`
    font-size: 16px;
    font-weight: 400px;
    color: #a3a3a3;
`

export const ButtonShow = styled.button`
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)}; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    /* background-color: #ebebeb; */
    border-radius: 50%;

    & img{
        transition: all 200ms ease-in-out;
        transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : ''};
    }
`

export const CardBody = styled.div`
    margin-top: 32px;
`

export const ListLeasson = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`

export const ListLeassonItem = styled.li`
    padding-left: ${({ theme }) => theme.spacing(2)};
    font-size: 18px;
    position: relative;

    &::before{
        position: absolute;
        top: 35%;
        left: 0;
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.black};
        content: "";
    }
`