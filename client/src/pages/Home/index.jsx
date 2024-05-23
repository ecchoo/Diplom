import { Container, Offer, Row, RowContent, RowImage, DirectionCards, DirectionCard, DirectionCardTitle, RowMainScreen, Advantages, AboutImage, Advantage, AdvantageIcon, AdvantageText, Section, AboutContent } from "./styled"
import { Title2, Title } from "@/UI"

import Arrow from '@/assets/icons/Arrow.svg'
import Delimeter from '@/assets/icons/Delimeter.svg'
import Cup from '@/assets/icons/about/cup.svg'
import Folder from '@/assets/icons/about/folder.svg'
import Laptop from '@/assets/icons/about/laptop.svg'
import Woman from '/woman2.png'
import AboutPhoto from '/aboutImage.jpg'
import FrontEnd from '/directions/front-end.png'
import BackEnd from '/directions/back-end.jpg'
import QaManual from '/directions/qa-manual.jpg'
import { Text } from "@/UI/Text"
import { Image } from "@/components/Image"
import { ButtonArrow } from "@/components/ButtonArrow"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const Home = () => {
    return (
        <>
            <Header />
            <section>
                <Container>
                    <RowMainScreen>
                        <RowContent>
                            <Offer>Откройте дверь в мир веб-разработки</Offer>
                            {/* <Direction>
                                <DirectionText>Узнать свое направление </DirectionText>
                                <ButtonArrow><img src={Arrow} alt="Arrow" /></ButtonArrow>
                            </Direction> */}
                            <ButtonArrow
                                text='Узнать свое направление'
                            />
                        </RowContent>
                        <RowImage src={Woman} alt="Woman" />
                    </RowMainScreen>
                </Container>
            </section>
            <Section>
                <Container>
                    <Title>Наши направления</Title>
                    <DirectionCards>
                        <DirectionCard>
                            <Image src={FrontEnd} alt="front-end"></Image>
                            <DirectionCardTitle>Front-end</DirectionCardTitle>
                        </DirectionCard>
                        <DirectionCard>
                            <Image src={QaManual} alt="qa-manual" ></Image>
                            <DirectionCardTitle>Qa manual</DirectionCardTitle>
                        </DirectionCard>
                        <DirectionCard>
                            <Image src={BackEnd} alt="back-end" ></Image>
                            <DirectionCardTitle>Back-end</DirectionCardTitle>
                        </DirectionCard>
                    </DirectionCards>
                </Container>
            </Section>
            <Section>
                <Container>
                    <Title>Получите необходимые знание и получите желаемую работу</Title>
                    <AboutContent>
                        <Advantages>
                            <Advantage>
                                <AdvantageIcon>
                                    <img src={Cup} alt="cup" />
                                </AdvantageIcon>
                                <AdvantageText>
                                    <Title2>Команда</Title2>
                                    <Text>Лучшие преподаватели со всего мира</Text>
                                </AdvantageText>
                            </Advantage>
                            <img className="delimeter" src={Delimeter} alt="Del" />
                            <Advantage>
                                <AdvantageIcon>
                                    <img src={Folder} alt="folder" />
                                </AdvantageIcon>
                                <AdvantageText>
                                    <Title2>Обширность материала</Title2>
                                    <Text>Большой выбор курсов с доступной ситемой обучения</Text>
                                </AdvantageText>
                            </Advantage>
                            <img className="delimeter" src={Delimeter} alt="Del" />
                            <Advantage>
                                <AdvantageIcon>
                                    <img src={Laptop} alt="laptop" />
                                </AdvantageIcon>
                                <AdvantageText>
                                    <Title2>Обширность материала</Title2>
                                    <Text>Большой выбор курсов с доступной ситемой обучения</Text>
                                </AdvantageText>
                            </Advantage>
                        </Advantages>
                        <AboutImage>
                            <Image src={AboutPhoto} alt='About image' />
                        </AboutImage>
                    </AboutContent>
                </Container>
            </Section>
            {/* <Section>
                <Container>
                    <Title>Отзывы наших студентов</Title>
                    <SliderReviews></SliderReviews>
                </Container>
            </Section> */}
            <Footer />
        </>
    )
}