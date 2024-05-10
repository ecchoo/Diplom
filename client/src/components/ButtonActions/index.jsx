import { Button, Dot } from "./styled"

export const ButtonActions = ({ direction, handleClick }) => {
    return (
        <Button onClick={handleClick} className="button-actions" direction={direction}>
            <Dot />
            <Dot />
            <Dot />
        </Button>
    )
}