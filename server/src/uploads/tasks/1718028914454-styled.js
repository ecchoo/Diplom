import { Avatar } from "@/UI";
import styled from "styled-components";

export const AsideContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-between;
    row-gap: ${({theme}) => theme.spacing(6)};
    width: 24%;
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4.5)};
    background-color: ${({ theme }) => theme.colors.white};
    height: 100vh;
`

export const AsideHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: ${({ theme }) => theme.spacing(2)};
`

export const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1.5)};
    align-items: center;
`

export const AsideAvatar = styled(Avatar)`
    width: ${({ theme }) => theme.spacing(7)};
    height: ${({ theme }) => theme.spacing(7)};
`

export const Lines = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.spacing(0.5)};

    & div {
        background-color: ${({ theme }) => theme.colors.accent};
        border-radius: ${({ theme }) => theme.spacing(1)};
        width: ${({ theme }) => theme.spacing(2.5)};
        height: ${({ theme }) => theme.spacing(0.4)};
    }

    & div:last-child {
        opacity: 0.5
    }
`

export const UserName = styled.h2`
    font-size: 20px;
    font-weight: 500;
`

export const AsideFooter = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2.5)};
`

export const AsideFooterImages = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const AsideFooterImage = styled.img`
    border-radius: ${({ theme }) => theme.spacing(5)};
    width: ${({ theme }) => theme.spacing(5)};
    height: ${({ theme }) => theme.spacing(5)};

    &:first-child {
        margin-right: ${({ theme }) => theme.spacing(-1.5)};
        z-index: 2;
    }

    &:nth-child(2) {
        z-index: 1;
        width: ${({ theme }) => theme.spacing(7.5)};
        height: ${({ theme }) => theme.spacing(7.5)};
    }
`

export const ButtonPlus = styled.button`
    z-index: 2;
    margin-left: ${({ theme }) => theme.spacing(-1.5)};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #353535;
    border-radius: 50%;
    width: ${({ theme }) => theme.spacing(5)};
    height: ${({ theme }) => theme.spacing(5)};
`

export const AsideFooterCaption = styled.span`
    font-size: 14px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary}
`