import styled from 'styled-components'

export const CardWrapper = styled.div`
    position: relative;
    transition: all .3s ease-in-out;

    & .bgCard {
        width: 100%;
        height: 100%;
        position: absolute;
        background: linear-gradient(197.84deg, rgb(224, 227, 246) 17.882%,rgb(219, 193, 240) 86.804%);
        /* background-color: ${({ theme }) => theme.colors.secondary}; */
        border-radius: ${({ theme }) => theme.spacing(2)};
        z-index: -1;
        transition: all .2s ease-in-out;
    }  
    
    &:hover {
        transform: translateY(${({ theme }) => theme.spacing(-1)});
        cursor: pointer;
        & .bgCard {
            transform: rotate(10deg);
        }
    }
`

export const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.white};;
    border-radius: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(3)};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: ${({ theme }) => theme.spacing(35)};
`

export const Reviewer = styled.div`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(1)};
`

export const ReviewerInfo = styled.div`
    display: flex;
    flex-direction: column;
`

export const Name = styled.span`
    font-size: 20px;
    font-weight: 500;
`

export const Course = styled.span`
    color: ${({ theme }) => theme.colors.accent};
    font-size: 16px;
    font-weight: 400;
`