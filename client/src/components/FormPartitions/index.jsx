import { FormControl, FormHelperText, InputLabel, MenuItem, Typography } from "@mui/material"
import { Actions, ButtonAdd, ButtonDelete, ButtonNavigate, ButtonSave, Input, Management, PartitionAdditionHeader, PartitionAdditionWrapper, Navigation, Row, Select } from "./styled"
import { Add, NavigateNext, NavigateBefore } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deletePartition, setPartitions } from "@/store/reducers"
import { createPartition, updatePartition, deletePartition as deletePartitionApi } from "@/api"
import { StatusCodes } from "http-status-codes"
import { convertErrorsValidation } from "@/utils"

export const FormPartitions = () => {
    const initialPartition = { id: 0, name: '', description: '', moduleId: null, leassons: [] }

    const dispatch = useDispatch()
    const { courseCreateUpdate: { course: { modules, partitions } } } = useSelector(state => state)
    const [partition, setPartition] = useState(initialPartition)
    const [currentPartitionIndex, setCurrentPartitionIndex] = useState(0)
    const [initialLoad, setInitialLoad] = useState(true)
    const [errorsValidation, setErrorsValidation] = useState({})

    const isNext = currentPartitionIndex + 1 < partitions.length
    const isPrev = currentPartitionIndex - 1 >= 0
    const isDelete = currentPartitionIndex !== partitions.length

    const isDisabledForm = !modules.length

    const handleChange = (e) => {
        const { name, value } = e.target
        setPartition({ ...partition, [name]: value })
    }

    const handleAdd = () => {
        setCurrentPartitionIndex(partitions.length)
        setPartition(initialPartition)
    }

    const handleSave = async () => {
        try {
            if (isDisabledForm) return

            const isAddPartition = currentPartitionIndex === partitions.length

            let updatedPartitions = []

            if (isAddPartition) {
                const { data: { newPartition } } = await createPartition(partition)

                updatedPartitions = [...partitions, newPartition]
                setPartition(newPartition)
            } else {
                await updatePartition(partition)

                updatedPartitions = partitions.map(modulePartition => {
                    if (modulePartition.id === partition.id) {
                        return partition
                    }

                    return modulePartition
                })
            }

            setErrorsValidation({})
            dispatch(setPartitions(updatedPartitions))
        } catch (err) {
            console.error(err)
            if (err?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors)
                setErrorsValidation(convertedErrors)
            }
        }
    }

    const handleNavigate = (value) => {
        setCurrentPartitionIndex((prevIndex) => {
            const newIndex = prevIndex + value
            setPartition(partitions[newIndex])
            return newIndex
        })
    }

    const handleDelete = async () => {
        try {
            if (!isDelete) return

            await deletePartitionApi(partition.id)
            dispatch(deletePartition(partition.id))

            const currentCountPartitions = partitions.length - 1
            const isLastPartitionDeleted = !currentCountPartitions
                || currentPartitionIndex >= currentCountPartitions

            if (isLastPartitionDeleted) {
                setCurrentPartitionIndex(currentCountPartitions)
                setPartition(initialPartition)
            } else {
                setPartition(partitions[currentPartitionIndex + 1])
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleNext = () => isNext && handleNavigate(1)
    const handlePrev = () => isPrev && handleNavigate(-1)

    useEffect(() => {
        if (initialLoad && partitions.length > 0) {
            setPartition(partitions[0]);
            setCurrentPartitionIndex(0);
            setInitialLoad(false);
        } else if (partitions.length === 0) {
            setPartition(initialPartition);
            setCurrentPartitionIndex(0);
        } else if (currentPartitionIndex >= partitions.length) {
            setCurrentPartitionIndex(partitions.length - 1);
            setPartition(partitions[partitions.length - 1]);
        }
    }, [partitions]);


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
                    disabled={isDisabledForm}
                    error={errorsValidation?.name}
                    helperText={errorsValidation?.name}
                />
                <FormControl error={errorsValidation?.moduleId}>
                    <InputLabel id="moduleId-label">Модуль</InputLabel>
                    <Select
                        labelId="module-label"
                        id="moduleId"
                        value={partition.moduleId ?? ''}
                        name="moduleId"
                        label="Модуль"
                        onChange={handleChange}
                        disabled={isDisabledForm}
                    >
                        {modules.map((module) =>
                            <MenuItem key={module.id} value={module.id}>{module.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errorsValidation?.moduleId}</FormHelperText>
                </FormControl>
            </Row>
            <Input
                onChange={handleChange}
                value={partition.description}
                id="description"
                name='description'
                multiline rows={6}
                label="Описание раздела"
                variant="outlined"
                error={errorsValidation?.description}
                helperText={errorsValidation?.description}
                disabled={isDisabledForm}
            />
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
                    <ButtonSave disabled={isDisabledForm} type="button" onClick={handleSave}>
                        Сохранить
                    </ButtonSave>
                </Management>
            </Actions>
        </PartitionAdditionWrapper>
    )
}
