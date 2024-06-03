import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material"
import { Actions, ButtonAdd, ButtonDelete, ButtonNavigate, ButtonSave, Input, Management, PartitionAdditionHeader, PartitionAdditionWrapper, Navigation, Row, Select } from "./styled"
import { Add, NavigateNext, NavigateBefore } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { setPartitions } from "@/store/reducers"

export const FormPartitions = () => {
    const initialPartition = { name: '', description: '', module: '', leassons: [] }

    const dispatch = useDispatch()
    const { courseCreateUpdate: { course: { modules, partitions } } } = useSelector(state => state)

    const [partition, setPartition] = useState(initialPartition)
    const [currentPartitionIndex, setCurrentPartitionIndex] = useState(0)

    const isNext = currentPartitionIndex + 1 < partitions.length
    const isPrev = currentPartitionIndex - 1 >= 0
    const isDelete = currentPartitionIndex !== partitions.length

    const handleChange = (e) => {
        const { name, value } = e.target
        setPartition({ ...partition, [name]: value })
    }

    const handleAdd = () => {
        setCurrentPartitionIndex(partitions.length)
        setPartition(initialPartition)
    }

    const handleSave = () => {
        const isAddPartition = currentPartitionIndex === partitions.length

        const updatedPartitions = isAddPartition
            ? [...partitions, partition]
            : partitions.map((coursePartition, index) =>
                index === currentPartitionIndex ? { ...coursePartition, ...partition } : coursePartition
            )

        dispatch(setPartitions(updatedPartitions))
    }

    const handleNavigate = (value) => {
        setCurrentPartitionIndex((prevIndex) => {
            const newIndex = prevIndex + value
            setPartition(partitions[newIndex])
            return newIndex
        })
    }

    const handleDelete = () => {
        if (!isDelete) return

        const updatedPartitons = partitions.filter((_, index) => currentPartitionIndex !== index)
        dispatch(setPartitions(updatedPartitons))

        if (updatedPartitons.length === 0 || currentPartitionIndex >= updatedPartitons.length) {
            setCurrentPartitionIndex(updatedPartitons.length)
            setPartition(initialPartition)
        } else {
            setPartition({ ...updatedPartitons[currentPartitionIndex] })
        }

    }

    const handleNext = () => isNext && handleNavigate(1)
    const handlePrev = () => isPrev && handleNavigate(-1)

    return (
        <PartitionAdditionWrapper>
            <PartitionAdditionHeader>
                <Typography variant="h6" component="div">
                    Разделы курса
                </Typography>
                <ButtonAdd type="button" onClick={handleAdd}>
                    <Add />
                </ButtonAdd>
            </PartitionAdditionHeader>
            <Row>
                <Input
                    onChange={handleChange}
                    value={partition.name}
                    id="name"
                    name='name'
                    label="Название раздела"
                    variant="outlined"
                />
                <FormControl>
                    <InputLabel id="module-label">Модуль</InputLabel>
                    <Select
                        labelId="module-label"
                        id="module"
                        value={partition.module !== null ? partition.module : ''}
                        name="module"
                        label="Модуль"
                        onChange={handleChange}
                    >
                        {modules.map((module, index) =>
                            <MenuItem key={index} value={index}>{module.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Row>
            <Input
                onChange={handleChange}
                value={partition.description}
                id="description"
                name='description'
                multiline rows={6}
                label="Описание раздела"
                variant="outlined" />
            <Actions>
                <Navigation>
                    <ButtonNavigate type="button" disabled={!isPrev} onClick={handlePrev}>
                        <NavigateBefore />
                    </ButtonNavigate>
                    <ButtonNavigate type="button" disabled={!isNext} onClick={handleNext}>
                        <NavigateNext />
                    </ButtonNavigate>
                </Navigation>
                <Management>
                    <ButtonDelete onClick={handleDelete} disabled={!isDelete} type="button">
                        Удалить
                    </ButtonDelete>
                    <ButtonSave type="button" onClick={handleSave}>
                        Сохранить
                    </ButtonSave>
                </Management>
            </Actions>
        </PartitionAdditionWrapper>
    )
}
