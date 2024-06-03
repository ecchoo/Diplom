import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { MultSelect, MultipleSelectContainer } from './styled'
import { useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export const MultipleSelect = ({ options, placeholder, onChange }) => {
    const [selectedValues, setSelectedValues] = useState([])

    const handleChange = (e) => {
        const { target: { value } } = e
        setSelectedValues(typeof value === 'string' ? value.split(',') : value)
        onChange(value)
    }

    return (
        <MultipleSelectContainer>
            <InputLabel id="demo-multiple-chip-label">{placeholder}</InputLabel>
            <MultSelect
                className='MultipleSelect'
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedValues}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label={placeholder} />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value.name} label={value.name} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.name}
                        value={option}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </MultSelect>
        </MultipleSelectContainer>
    )
}
