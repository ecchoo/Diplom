import styled from "styled-components";
import { CallReceived as MUICallReceived } from '@mui/icons-material';

export const Container = styled.div`
    display: flex;
    padding: ${({ theme }) => theme.spacing(4, 7)};
    column-gap: ${({ theme }) => theme.spacing(5)};
    /* justify-content: space-between; */
`

export const CourseList = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    gap: ${({ theme }) => theme.spacing(2)};
    width: 100%;
    /* overflow-y: auto;
    max-height: 600px; 

    &::-webkit-scrollbar{
        width: 5px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: ${({ theme }) => theme.colors.gray}
    } */
`

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* padding: ${({ theme }) => theme.spacing(2)}; */
    height: 500px;
    /* background-color: ${({ theme }) => theme.colors.white}; */
    width: 25%;
    border-radius: ${({ theme }) => theme.spacing(2)};
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const Search = styled.div`
    /* margin: ${({ theme }) => theme.spacing(2)}; */
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({ theme }) => theme.spacing(1)};
    background-color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.white};
`

export const SearchInput = styled.input`
    width: 80%;
    background-color: transparent;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
`

export const SearchImg = styled.img`
    width: ${({ theme }) => theme.spacing(2)};
    height: ${({ theme }) => theme.spacing(2)};
`

export const BlockFilters = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.spacing(1)};
    background-color: ${({ theme }) => theme.colors.accent};
    padding: ${({ theme }) => theme.spacing(2)};
    width: 100%;
    /* height: 200px; */
    background-color: ${({ theme }) => theme.colors.accent};
    /* background: linear-gradient(197.84deg, rgb(224, 227, 246) 17.882%,rgb(219, 193, 240) 86.804%); */
`

export const TitleFilters = styled.span`
    color: ${({ theme }) => theme.colors.white};
    font-size: 20px;
    font-weight: 500;
`

// Обертка для чекбоксов
export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    /* margin-bottom: 10px; */
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1)};
    /* background: linear-gradient(197.84deg, rgb(224, 227, 246) 17.882%,rgb(219, 193, 240) 86.804%); */

`;

export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    z-index: -1;
    position: absolute;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    column-gap: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};

    &::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        margin-right: 10px;
        background-color: #fff;
        background-position: center center;
        background-repeat: no-repeat;
        border: 1px solid #ccc;
    }

    ${CustomCheckbox}:checked + &::before {
        transition-property: background-color;
        transition-duration: 0.4s;
        background-color: ${({ theme }) => theme.colors.accent};
        /* background: linear-gradient(197.84deg, rgb(224, 227, 246) 17.882%,rgb(219, 193, 240) 86.804%); */

        /* background: linear-gradient(124.82deg, #17C19B 14.21%, #04B7CB 54.46%); */
    }
`;

export const CallReceived = styled(MUICallReceived)`
    transform: rotate(270deg);
`