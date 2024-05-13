import { useState } from "react"
import { ButtonShow, Card, CardBody, CardHeader, CardPreview, CardSubTitle, CardTitle, ListLeasson, ListLeassonItem } from "./styled"
import ShowIcon from '@/assets/icons/arrowDown.svg'

export const CardPartition = ({ name, leassons }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => setIsOpen(!isOpen)

    return (
        <Card onClick={handleClick} isOpen={isOpen} className="cardCoursePartition">
            <CardHeader>
                <CardPreview>
                    <CardTitle>{name}</CardTitle>
                    <CardSubTitle>
                        {10} практических заданий {leassons.length} уроков
                    </CardSubTitle>
                </CardPreview>
                <ButtonShow isOpen={isOpen}>
                    <img src={ShowIcon} alt="Show icon" />
                </ButtonShow>
            </CardHeader>
            <CardBody>
                <ListLeasson>
                    {leassons.map(({ id, name }) => 
                        <ListLeassonItem key={id}>{name}</ListLeassonItem>
                    )}
                </ListLeasson>
            </CardBody>
        </Card>
    )
}