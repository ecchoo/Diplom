import { Button, Arrow, ButtonText } from "./styled"
import ArrowIcon from '@/assets/icons/Arrow.svg'

export const ButtonArrow = ({ text }) => {
    return (
        <Button className="button-arrow">
            <ButtonText>{text}</ButtonText>
            <Arrow><img src={ArrowIcon} alt="Arrow" /></Arrow>
        </Button>
    )
}