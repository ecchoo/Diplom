import styled from 'styled-components'

export const Section = styled.section`
    padding-top: ${({ theme }) => theme.spacing(5)};
`

export const Container = styled.div`
    padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(7)};
`
export const RowMainScreen = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const RowContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(8)};
    width: 50%;
`

export const Offer = styled.h1`
    font-size: 55px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
`



export const RowImage = styled.img`
    width: 39%;
    border-radius: ${({ theme }) => theme.spacing(1.5)};
`

export const DirectionCards = styled.div`
    display: flex;
    padding-top: ${({ theme }) => theme.spacing(5)};
    justify-content: space-between;
`

export const DirectionCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
    width: 30%;
    height: max-content;
    transition: all .2s ease-in-out;
`

export const DirectionCardTitle = styled.h2`
    font-size: 20px;
`

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const AboutContent = styled.div`
    padding-top: ${({ theme }) => theme.spacing(10)};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Advantages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    row-gap: ${({ theme }) => theme.spacing(1.5)};

    & .delimeter {
        height: ${({ theme }) => theme.spacing(7)};
        align-self: flex-start;
        margin-left: ${({ theme }) => theme.spacing(3)};
    }
`

export const Advantage = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(2)};
`

export const AdvantageIcon = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 15px; */
    width: ${({ theme }) => theme.spacing(6.4)};
    height: ${({ theme }) => theme.spacing(6.4)};
    border-radius: 50%;
`

export const AdvantageText = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(0.7)};
`

export const AboutImage = styled.div`
    position: relative;
    width: 55%;
`

// export const PhotoLabel = styled.div`
//     top: -8%;
//     border-radius: 20px;
//     z-index: 2;
//     position: absolute;
//     right: 40px;
//     padding: 16px 25px;
//     background-color: #c19cf6;
//     display: flex;
//     justify-content: space-between;
//     column-gap: 70px;

//     & div {
//         display: flex;
//         align-items: center;
//         column-gap: 15px;
//         width: 213px;
//     }

//     & h2 {
//         font-size: 50px;
//         font-weight: 400;
//     }
// `;
