import { Button, Typography } from "@mui/material"
import { Actions, ButtonAdd, ButtonDelete, ButtonNavigate, ButtonSave, Input, Management, ModuleAdditionHeader, ModuleAdditionWrapper, Navigation } from "./styled"
import { Add, NavigateNext, NavigateBefore } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { deleteModule, setIsOpenModalAuth, setModules } from "@/store/reducers"
import { useEffect, useState } from "react"
import { createModule, deleteModule as deleteModuleApi, updateModule } from "@/api"
import { convertErrorsValidation } from "@/utils"
import { StatusCodes } from "http-status-codes"

export const FormModules = () => {
    const initialModule = { id: 0, name: '', description: '', partitions: [] }

    const dispatch = useDispatch()
    const { courseCreateUpdate: { course: { id: courseId, modules } } } = useSelector(state => state)

    const [module, setModule] = useState(initialModule)
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
    const [initialLoad, setInitialLoad] = useState(true)
    const [errorsValidation, setErrorsValidation] = useState({})

    const isNext = currentModuleIndex + 1 < modules.length
    const isPrev = currentModuleIndex - 1 >= 0
    const isDelete = currentModuleIndex !== modules.length

    const isDisabledForm = !courseId

    const handleChange = (e) => {
        const { target: { name, value } } = e
        setModule({ ...module, [name]: value })
    }

    const handleAdd = () => {
        setCurrentModuleIndex(modules.length)
        setModule(initialModule)
    }

    const handleSave = async () => {
        try {
            if (isDisabledForm) return

            const isAddModule = currentModuleIndex === modules.length
            let updatedModules = []

            if (isAddModule) {
                const { data: { newModule } } = await createModule({ ...module, courseId })

                updatedModules = [...modules, newModule]
                setModule(newModule)
            } else {
                await updateModule(module)

                updatedModules = modules.map(courseModule => {
                    if (courseModule.id === module.id) {
                        return module
                    }

                    return courseModule
                })
            }
            
            setErrorsValidation({})
            dispatch(setModules(updatedModules))
        } catch (err) {
            console.error(err)
            if (err?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors)
                setErrorsValidation(convertedErrors)
            }
        }
    }

    const handleNavigate = (value) => {
        setCurrentModuleIndex((prevIndex) => {
            const newIndex = prevIndex + value
            setModule(modules[newIndex])
            return newIndex
        })
    }

    const handleDelete = async () => {
        try {
            if (!isDelete) return

            await deleteModuleApi(module.id)
            dispatch(deleteModule(module.id))

            const currentCountModules = modules.length - 1
            const isLastModuleDeleted = !currentCountModules
                || currentModuleIndex >= currentCountModules

            if (isLastModuleDeleted) {
                setCurrentModuleIndex(currentCountModules)
                setModule(initialModule)
            } else {
                setModule(modules[currentModuleIndex + 1])
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleNext = () => isNext && handleNavigate(1)
    const handlePrev = () => isPrev && handleNavigate(-1)

    useEffect(() => {
        if (initialLoad && modules.length > 0) {
            setModule(modules[0])
            setCurrentModuleIndex(0)
            setInitialLoad(false)
        }
    }, [modules])

    return (
        <ModuleAdditionWrapper>
            <ModuleAdditionHeader>
                <Typography variant="h6" component="div">
                    Модули курса
                </Typography>
                <ButtonAdd type="button" onClick={handleAdd}>
                    <Add />
                </ButtonAdd>
            </ModuleAdditionHeader>
            <Input
                onChange={handleChange}
                value={module.name}
                id="name"
                name='name'
                label="Название модуля"
                variant="outlined"
                disabled={isDisabledForm}
                error={errorsValidation?.name}
                helperText={errorsValidation?.name}
            />
            <Input
                onChange={handleChange}
                value={module.description}
                id="description"
                name='description'
                multiline rows={6}
                label="Описание модуля"
                variant="outlined"
                disabled={isDisabledForm}
                error={errorsValidation?.description}
                helperText={errorsValidation?.description}
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
                    <ButtonSave type="button" disabled={isDisabledForm} onClick={handleSave}>
                        Сохранить
                    </ButtonSave>
                </Management>
            </Actions>
        </ModuleAdditionWrapper>
    )
}