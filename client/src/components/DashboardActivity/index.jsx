import { useSelector } from "react-redux"
import { ButtonContinue, DashboardActivityContainer, DashboardActivityHeader, Descriptor, Offer, SalutationBlock } from "./styled"

export const DashboardActivity = () => {
    const { user: { name } } = useSelector(state => state)

    return (
        <DashboardActivityContainer>
            <DashboardActivityHeader>
                <SalutationBlock>
                    <Offer>С возвращением, {name}!</Offer>
                    <Descriptor>Продолжите обучение, в последний раз вы выполнили 5 уроков</Descriptor>
                    <ButtonContinue>Продолжить обучение</ButtonContinue>
                </SalutationBlock>
            </DashboardActivityHeader>
        </DashboardActivityContainer>
    )
}