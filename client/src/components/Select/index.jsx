import { useRef, useState } from "react"
import { SelectContainer, SelectControl, SelectIcon, SelectOption, SelectOptions } from "./styled"
import ArrowDown from '@/assets/icons/arrowDown.svg'
import { useOnClickOutside } from "@/hooks"

export const Select = ({ options, initialtOption, onChange }) => {
    const ref = useRef(null)

    const [isShow, setIsShow] = useState(false)
    const [selectedOption, setSelectedOption] = useState(initialtOption)

    const handleClick = () => setIsShow(!isShow)
    const handleClose = () => setIsShow(false)
    
    const handleChange = (option) => {
        setSelectedOption(option)
        setIsShow(false)
        onChange(option)
    }

    useOnClickOutside(ref, handleClose)

    return (
        <SelectContainer ref={ref} isShow={isShow}>
            <SelectControl onClick={handleClick}>
                <span>{selectedOption.text}</span>
                <SelectIcon isShow={isShow} src={ArrowDown} alt="Arrow down" />
            </SelectControl>
            {isShow && options.length ? (
                <SelectOptions>
                    {options.map((option) =>
                        <SelectOption
                            key={option.id}
                            isSelected={option.id === selectedOption.id}
                            onClick={handleChange.bind(null, option)}
                        >
                            {option.text}
                        </SelectOption>
                    )}
                </SelectOptions>
            ) : (
                null
            )}
        </SelectContainer>
    )
}