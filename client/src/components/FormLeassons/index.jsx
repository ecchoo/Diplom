import { FormControl, FormHelperText, InputLabel, MenuItem, Typography } from "@mui/material"
import { Actions, ButtonAdd, ButtonDelete, ButtonNavigate, ButtonSave, Input, Management, LeassonAdditionHeader, LeassonAdditionWrapper, Navigation, Row, Select, QuillWrapper } from "./styled"
import { Add, NavigateNext, NavigateBefore } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import Quill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from "react"
import { deleteLeasson, setLeassons } from "@/store/reducers"
import { QUILL_OPTIONS } from "@/constants"
import { createLeasson, updateLeasson, deleteLeasson as deleteLeassonApi } from "@/api"
import { StatusCodes } from "http-status-codes"
import { convertErrorsValidation } from "@/utils"

export const FormLeassons = () => {
    const initialLeasson = { id: 0, name: '', time: 0, partitionId: null, content: '' }

    const dispatch = useDispatch()
    const { courseCreateUpdate: { course: { partitions, leassons } } } = useSelector(state => state)

    const [leasson, setLeasson] = useState(initialLeasson)
    const [currentLeassonIndex, setCurrentLeassonIndex] = useState(0)
    const [initialLoad, setInitialLoad] = useState(true)
    const [errorsValidation, setErrorsValidation] = useState({})

    const isNext = currentLeassonIndex + 1 < leassons.length
    const isPrev = currentLeassonIndex - 1 >= 0
    const isDelete = currentLeassonIndex !== leassons.length

    const isDisabledForm = !partitions.length


    const handleChange = (e) => {
        const { name, value } = e.target
        setLeasson({ ...leasson, [name]: value })
    }

    const handleChangeQuill = (value) => {
        setLeasson((prev) => ({ ...prev, content: value }))
    }

    const handleAdd = () => {
        setCurrentLeassonIndex(leassons.length)
        setLeasson(prevLeasson => {
            return { ...prevLeasson, ...initialLeasson }
        })
    }

    const handleSave = async () => {
        try {
            if (isDisabledForm) return

            const isAddLeasson = currentLeassonIndex === leassons.length

            let updatedLeassons = []

            if (isAddLeasson) {
                const { data: { newLeasson } } = await createLeasson(leasson)

                updatedLeassons = [...leassons, newLeasson]
                setLeasson(newLeasson)
            } else {
                await updateLeasson(leasson)

                updatedLeassons = leassons.map(partitionLeasson => {
                    if (partitionLeasson.id === leasson.id) {
                        return leasson
                    }

                    return partitionLeasson
                })
            }

            setErrorsValidation({})
            dispatch(setLeassons(updatedLeassons))
        } catch (err) {
            console.error(err)
            if (err?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors)
                setErrorsValidation(convertedErrors)
            }
        }
    }

    const handleNavigate = (value) => {
        setCurrentLeassonIndex((prevIndex) => {
            const newIndex = prevIndex + value
            setLeasson(leassons[newIndex])
            return newIndex
        })
    }

    const handleDelete = async () => {
        try {
            if (!isDelete) return

            await deleteLeassonApi(leasson.id)
            dispatch(deleteLeasson(leasson.id))

            const currentCountLeassons = leassons.length - 1
            const isLastPartitionDeleted = !currentCountLeassons
                || currentLeassonIndex >= currentCountLeassons

            if (isLastPartitionDeleted) {
                setCurrentLeassonIndex(currentCountLeassons)
                setLeasson(initialLeasson)
            } else {
                setLeasson(leassons[currentLeassonIndex + 1])
            }
        } catch (err) {
            console.error(err)
        }

    }

    const handleNext = () => isNext && handleNavigate(1)
    const handlePrev = () => isPrev && handleNavigate(-1)

    useEffect(() => {
        if (initialLoad && leassons.length > 0) {
            setLeasson(leassons[0]);
            setCurrentLeassonIndex(0);
            setInitialLoad(false);
        } else if (leassons.length === 0) {
            setLeasson(initialLeasson);
            setCurrentLeassonIndex(0);
        } else if (currentLeassonIndex >= leassons.length) {
            setCurrentLeassonIndex(leassons.length - 1);
            setLeasson(leassons[leassons.length - 1]);
        }
    }, [leassons]);

    return (
        <LeassonAdditionWrapper>
            <LeassonAdditionHeader>
                <Typography variant="h6" component="div">
                    Уроки курса
                </Typography>
                <ButtonAdd type="button" onClick={handleAdd}>
                    <Add />
                </ButtonAdd>
            </LeassonAdditionHeader>
            <Row>
                <Input
                    onChange={handleChange}
                    value={leasson.name}
                    id="name"
                    name='name'
                    label="Название урока"
                    variant="outlined"
                    disabled={isDisabledForm}
                    error={errorsValidation?.name}
                    helperText={errorsValidation?.name}
                />
                <FormControl error={errorsValidation?.partitionId}>
                    <InputLabel id="partitionId-label">Раздел</InputLabel>
                    <Select
                        labelId="partitionId-label"
                        id="partitionId"
                        value={leasson.partitionId ?? ''}
                        name="partitionId"
                        label="Раздел"
                        onChange={handleChange}
                        disabled={isDisabledForm}
                    >
                        {partitions.map((partition) =>
                            <MenuItem key={partition.id} value={partition.id}>{partition.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errorsValidation?.partitionId}</FormHelperText>
                </FormControl>
                <Input
                    onChange={handleChange}
                    value={leasson.time}
                    id="time"
                    name='time'
                    label="Время урока в минутах"
                    variant="outlined"
                    disabled={isDisabledForm}
                    error={errorsValidation?.time}
                    helperText={errorsValidation?.time}
                />
            </Row>
            <QuillWrapper error={errorsValidation?.content}>
                <Quill
                    value={leasson.content}
                    onChange={handleChangeQuill}
                    modules={{
                        toolbar: QUILL_OPTIONS,
                    }}
                    placeholder="Содержание урока"
                    readOnly={isDisabledForm}
                />
                <FormHelperText>{errorsValidation?.content}</FormHelperText>
            </QuillWrapper>
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
        </LeassonAdditionWrapper>
    )
}