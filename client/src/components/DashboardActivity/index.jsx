import { ButtonContinue, DashboardActivityContainer, DashboardActivityHeader, Descriptor, Offer, SalutationBlock } from "./styled"

export const DashboardActivity = () => {
    return (
        <DashboardActivityContainer>
            <DashboardActivityHeader>
                <SalutationBlock>
                    <Offer>С возвращением, David!</Offer>
                    <Descriptor>Продолжите обучение, в последний раз вы выполнили 5 уроков</Descriptor>
                    <ButtonContinue>Продолжить обучение</ButtonContinue>
                </SalutationBlock>
            </DashboardActivityHeader>
        </DashboardActivityContainer>
    )
}