import { FormControl, FormHelperText, InputLabel, MenuItem, Typography } from "@mui/material"
import { Actions, ButtonAdd, ButtonDelete, ButtonNavigate, ButtonSave, Input, Management, PartitionAdditionHeader, PartitionAdditionWrapper, Navigation, Row, Select } from "./styled"
import { Add, NavigateNext, NavigateBefore } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deletePracticalTask, setPracticalTasks } from "@/store/reducers"
import { createPracticalTask, updatePracticalTask, deletePracticalTask as deletePracticalTaskApi } from "@/api"
import { StatusCodes } from "http-status-codes"
import { convertErrorsValidation } from "@/utils"

export const FormPracticalTasks = () => {
    const initialPracticalTask = { id: 0, condition: '', leassonId: null, }

    const dispatch = useDispatch()
    const { courseCreateUpdate: { course: { id: courseId, leassons, practicalTasks } } } = useSelector(state => state)
    const [practicalTask, setPracticalTask] = useState(initialPracticalTask)
    const [currentPracticalTaskIndex, setCurrentPracticalTaskIndex] = useState(0)
    const [initialLoad, setInitialLoad] = useState(true)
    const [errorsValidation, setErrorsValidation] = useState({})

    const isNext = currentPracticalTaskIndex + 1 < practicalTasks.length
    const isPrev = currentPracticalTaskIndex - 1 >= 0
    const isDelete = currentPracticalTaskIndex !== practicalTasks.length

    const isDisabledForm = !leassons.length

    const handleChange = (e) => {
        const { name, value } = e.target
        setPracticalTask({ ...practicalTask, [name]: value })
    }

    const handleAdd = () => {
        setCurrentPracticalTaskIndex(practicalTasks.length)
        setPracticalTask(initialPracticalTask)
    }

    const handleSave = async () => {
        try {
            if (isDisabledForm) return

            const isAddPracticalTask = currentPracticalTaskIndex === practicalTasks.length

            let updatedPracticalTasks = []

            if (isAddPracticalTask) {
                const { data: { newPracticalTask } } = await createPracticalTask({ ...practicalTask, courseId })

                updatedPracticalTasks = [...practicalTasks, newPracticalTask]
                setPracticalTask(newPracticalTask)
            } else {
                await updatePracticalTask(practicalTask)

                updatedPracticalTasks = practicalTasks.map(leassonPracticalTask => {
                    if (leassonPracticalTask.id === practicalTask.id) {
                        return practicalTask
                    }

                    return leassonPracticalTask
                })
            }

            setErrorsValidation({})
            dispatch(setPracticalTasks(updatedPracticalTasks))
        } catch (err) {
            console.error(err)
            if (err?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors)
                setErrorsValidation(convertedErrors)
            }
        }
    }

    const handleNavigate = (value) => {
        setCurrentPracticalTaskIndex((prevIndex) => {
            const newIndex = prevIndex + value
            setPracticalTask(practicalTasks[newIndex])
            return newIndex
        })
    }

    const handleDelete = async () => {
        try {
            if (!isDelete) return

            await deletePracticalTaskApi({ practicalTaskId: practicalTask.id, courseId })
            dispatch(deletePracticalTask(practicalTask.id))

            const currentCountPracticalTask = practicalTasks.length - 1
            const isLastPracticalTaskDeleted = !currentCountPracticalTask
                || currentPracticalTaskIndex >= currentCountPracticalTask

            if (isLastPracticalTaskDeleted) {
                setCurrentPracticalTaskIndex(currentCountPracticalTask)
                setPracticalTask(initialPracticalTask)
            } else {
                setPracticalTask(practicalTasks[currentPracticalTaskIndex + 1])
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleNext = () => isNext && handleNavigate(1)
    const handlePrev = () => isPrev && handleNavigate(-1)

    useEffect(() => {
        if (initialLoad && practicalTasks.length > 0) {
            setPracticalTask(practicalTasks[0]);
            setCurrentPracticalTaskIndex(0);
            setInitialLoad(false);
        } else if (practicalTasks.length === 0) {
            setPracticalTask(initialPracticalTask);
            setCurrentPracticalTaskIndex(0);
        } else if (currentPracticalTaskIndex >= practicalTasks.length) {
            setCurrentPracticalTaskIndex(practicalTasks.length - 1);
            setPracticalTask(practicalTasks[practicalTasks.length - 1]);
        }
    }, [practicalTasks]);

    return (
        <PartitionAdditionWrapper>
            <PartitionAdditionHeader>
                <Typography variant="h6" component="div">
                    Практические задания
                </Typography>
                <ButtonAdd type="button" onClick={handleAdd}>
                    <Add />
                </ButtonAdd>
            </PartitionAdditionHeader>
            <FormControl error={errorsValidation?.leassonId}>
                <InputLabel id="leassonId-label">Урок</InputLabel>
                <Select
                    labelId="leassonId-label"
                    id="leassonId"
                    value={practicalTask.leassonId ?? ''}
                    name="leassonId"
                    label="Урок"
                    onChange={handleChange}
                    disabled={isDisabledForm}
                >
                    {leassons.map((leasson) =>
                        <MenuItem key={leasson.id} value={leasson.id}>{leasson.name}</MenuItem>
                    )}
                </Select>
                <FormHelperText>{errorsValidation?.leassonId}</FormHelperText>
            </FormControl>
            <Input
                onChange={handleChange}
                value={practicalTask.condition}
                id="condition"
                name='condition'
                multiline rows={6}
                label="Условие задания"
                variant="outlined"
                error={errorsValidation?.condition}
                helperText={errorsValidation?.condition}
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
