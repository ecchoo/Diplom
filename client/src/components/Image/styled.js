import styled from 'styled-components'

export const StyledImage = styled.div`
    position: relative;
    transition: all .3s ease-in-out;

    & img {
        border-radius: 20px;
    }

    & div {
        width: 100%;
        height: 100%;
        position: absolute;
        /* background-color: #f4ff73; */
        background: linear-gradient(197.84deg, rgb(224, 227, 246) 17.882%,rgb(219, 193, 240) 86.804%);
        border-radius: 20px;
        z-index: -1;
        transition: all .2s ease-in-out;
    }   

    &:hover {
        transform: translateY(-10px);

        & div {
            transform: rotate(7deg);
        }
    }
`