import styled from 'styled-components'

export const StyledImage = styled.div`
    position: relative;
    transition: all .3s ease-in-out;

    & img {
        border-radius: ${({ theme }) => theme.spacing(2)};
    }

    & div {
        width: 100%;
        height: 100%;
        position: absolute;
        /* background: linear-gradient(197.84deg, rgb(224, 227, 246) 17.882%,rgb(219, 193, 240) 86.804%); */
        background-color: ${({ theme }) => theme.colors.secondary};
        border-radius: ${({ theme }) => theme.spacing(2)};
        z-index: -1;
        transition: all .2s ease-in-out;
    }   

    &:hover {
        transform: translateY(${({ theme }) => theme.spacing(-1)});

        & div {
            transform: rotate(7deg);
        }
    }
`