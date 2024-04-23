import styled from "styled-components";

export const ContainerInput = styled.div`
    width: 100%;
`

export const InputBox = styled.div`
    position: relative;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    height: 40px;
    width: 100%;
`

export const InputField = styled.input`
    width: 100%;
    height: 40px;
    color: #262627;

    &:focus+.flyingPlaceholder, &:not(:placeholder-shown)+.flyingPlaceholder {
        top: -1vh;
        transform: translateY(-50%);
        opacity: 1;
        font-size: 15px;
        font-weight: 400;
    }
`

export const FlyingPlaceholder = styled.label`
    font-size: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
    position: absolute;
    transform: translateY(-50%);
    transform-origin: left center;
    top: 50%;
    pointer-events: none;
    transition: .3s ease-in-out;
`

export const ErrorValidation = styled.span`
    color: red;
    font-size: 15px;
`