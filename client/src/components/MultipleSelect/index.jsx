import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { MultSelect, MultipleSelectContainer } from './styled'
import { useEffect, useState } from 'react'
import { FormHelperText } from '@mui/material'

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

export const MultipleSelect = ({ options, placeholder, onChange, error, helperText, initialValues = [], disableOptions = [] }) => {
    const [selectedValues, setSelectedValues] = useState(initialValues)

    const handleChange = (e) => {
        const { target: { value } } = e
        const selected = typeof value === 'string' ? value.split(',') : value

        // Ensure that disabled options (e.g., current user) are not removed
        const updatedSelected = options.filter(option =>
            selected.includes(option) || disableOptions.includes(option.id)
        )

        setSelectedValues(updatedSelected)
        onChange(updatedSelected)
    }

    useEffect(() => {
        setSelectedValues(initialValues)
    }, [initialValues])

    return (
        <MultipleSelectContainer error={error}>
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
                            <Chip key={value.id} label={value.name} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        value={option}
                        disabled={disableOptions.includes(option.id)}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </MultSelect>
            <FormHelperText>{helperText}</FormHelperText>
        </MultipleSelectContainer>
    )
}
