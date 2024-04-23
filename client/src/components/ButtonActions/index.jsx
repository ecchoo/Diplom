import { Button, Dot } from "./styled"

export const ButtonActions = ({ direction }) => {
    return (
        <Button className="button-actions" direction={direction}>
            <Dot />
            <Dot />
            <Dot />
        </Button>
    )
}