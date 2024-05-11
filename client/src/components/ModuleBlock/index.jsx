import { useState } from "react"
import { ButtonShow, Module, ModuleHeader } from "./styled"
import PlusIcon from '@/assets/icons/plusWhite.svg'
import MinusIcon from '@/assets/icons/minus.svg'

export const ModuleBlock = ({ name, description }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ShowModuleIcon = isOpen ? MinusIcon : PlusIcon

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Module>
            <ModuleHeader>
                <h1>Модуль {name}</h1>
                <ButtonShow onClick={handleClick}>
                    <img src={ShowModuleIcon} alt="Plus icon" />
                </ButtonShow>
            </ModuleHeader>
            {isOpen && <p>{description}</p>}
        </Module>
    )
}