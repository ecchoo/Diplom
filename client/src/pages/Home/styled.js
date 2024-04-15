import styled from 'styled-components'

export const Section = styled.section`
    padding-top: 50px;
`

export const Container = styled.div`
    padding: 40px 70px;
`
export const RowMainScreen = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const RowContent = styled.div`
    /* padding-top: 60px; */
    display: flex;
    flex-direction: column;
    row-gap: 80px;
    width: 50%;
`

export const Offer = styled.h1`
    font-size: 55px;
    font-weight: 600;
    color: #353535;
`



export const RowImage = styled.img`
    width: 39%;
    border-radius: 15px;
`

export const DirectionCards = styled.div`
    display: flex;
    padding-top: 50px;
    justify-content: space-between;
`

export const DirectionCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
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
    padding-top: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Advantages = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-between;
    height: 100%;
    row-gap: 15px;
    /* width: 30%; */

    & .delimeter {
        height: 70px;
        align-self: flex-start;
        margin-left: 30px;
    }
`

export const Advantage = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    column-gap: 20px;
`

export const AdvantageIcon = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 15px; */
    width: 64px;
    height: 64px;
    border-radius: 50%;
`

export const AdvantageText = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 7px;
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
