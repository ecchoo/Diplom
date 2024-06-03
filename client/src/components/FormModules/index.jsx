import { Button, IconButton, Typography } from "@mui/material"
import { Actions, ButtonAdd, ButtonDelete, ButtonNavigate, ButtonSave, Input, Management, ModuleAdditionHeader, ModuleAdditionWrapper, Navigation } from "./styled"
import { Add, NavigateNext, NavigateBefore } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setModules } from "@/store/reducers"
import { useState } from "react"

export const FormModules = () => {
    const initialModule = { name: '', description: '', partitions: [] }

    const dispatch = useDispatch()
    const { courseCreateUpdate: { course: { modules } } } = useSelector(state => state)

    const [module, setModule] = useState(initialModule)
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0)

    const isNext = currentModuleIndex + 1 < modules.length
    const isPrev = currentModuleIndex - 1 >= 0
    const isDelete = currentModuleIndex !== modules.length

    const handleChange = (e) => {
        const { target: { name, value } } = e
        setModule({ ...module, [name]: value })
    }

    const handleAdd = () => {
        setCurrentModuleIndex(modules.length)
        setModule(initialModule)
    }

    const handleSave = () => {
        const isAddModule = currentModuleIndex === modules.length

        const updatedModules = isAddModule
            ? [...modules, module]
            : modules.map((courseModule, index) =>
                index === currentModuleIndex ? { ...courseModule, ...module } : courseModule
            )

        dispatch(setModules(updatedModules))
    }

    const handleNavigate = (value) => {
        setCurrentModuleIndex((prevIndex) => {
            const newIndex = prevIndex + value
            setModule({ ...modules[newIndex] })
            return newIndex
        })
    }

    const handleDelete = () => {
        if (!isDelete) return

        const updatedModules = modules.filter((_, index) => currentModuleIndex !== index)
        dispatch(setModules(updatedModules))

        if (updatedModules.length === 0 || currentModuleIndex >= updatedModules.length) {
            setCurrentModuleIndex(updatedModules.length)
            setModule(initialModule)
        } else {
            setModule({ ...updatedModules[currentModuleIndex] })
        }
    }

    const handleNext = () => isNext && handleNavigate(1)
    const handlePrev = () => isPrev && handleNavigate(-1)

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
            />
            <Input
                onChange={handleChange}
                value={module.description}
                id="description"
                name='description'
                multiline rows={6}
                label="Описание модуля"
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
        </ModuleAdditionWrapper>
    )
}