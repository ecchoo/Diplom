import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material"
import { Actions, ButtonAdd, ButtonDelete, ButtonNavigate, ButtonSave, Input, Management, LeassonAdditionHeader, LeassonAdditionWrapper, Navigation, Row, Select, QuillWrapper } from "./styled"
import { Add, NavigateNext, NavigateBefore } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { setLeassons } from "@/store/reducers"
import { QUILL_OPTIONS } from "@/constants";

export const FormLeassons = () => {
    const initialLeasson = { name: '', time: 0, partition: null, content: '' }

    const dispatch = useDispatch()
    const { courseCreateUpdate: { course: { partitions, leassons } } } = useSelector(state => state)

    const [leasson, setLeasson] = useState(initialLeasson)
    const [currentLeassonIndex, setCurrentLeassonIndex] = useState(0)

    const isNext = currentLeassonIndex + 1 < leassons.length
    const isPrev = currentLeassonIndex - 1 >= 0
    const isDelete = currentLeassonIndex !== leassons.length

    const handleChange = (e) => {
        const { name, value } = e.target
        setLeasson({ ...leasson, [name]: value })
    }

    const handleChangeQuill = (value) => {
        setLeasson((prev) => ({ ...prev, content: value }))
    }

    const handleAdd = () => {
        setCurrentLeassonIndex(leassons.length);
        setLeasson(prevLeasson => {
            return { ...prevLeasson, ...initialLeasson };
        });
    }

    const handleSave = () => {
        const isAddLeasson = currentLeassonIndex === leassons.length

        const updatedLeassons = isAddLeasson
            ? [...leassons, leasson]
            : leassons.map((courseLeasson, index) =>
                index === currentLeassonIndex ? { ...courseLeasson, ...leasson } : courseLeasson
            )

        dispatch(setLeassons(updatedLeassons))
    }

    const handleNavigate = (value) => {
        setCurrentLeassonIndex((prevIndex) => {
            const newIndex = prevIndex + value
            setLeasson(leassons[newIndex])
            return newIndex
        })
    }

    const handleDelete = () => {
        if (!isDelete) return

        const updatedLeassons = leassons.filter((_, index) => currentLeassonIndex !== index)
        dispatch(setLeassons(updatedLeassons))

        if (updatedLeassons.length === 0 || currentLeassonIndex >= updatedLeassons.length) {
            setCurrentLeassonIndex(updatedLeassons.length)
            setLeasson(initialLeasson)
        } else {
            setLeasson({ ...updatedLeassons[currentLeassonIndex] })
        }

    }

    const handleNext = () => isNext && handleNavigate(1)
    const handlePrev = () => isPrev && handleNavigate(-1)

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
                />
                <FormControl>
                    <InputLabel id="partition-label">Раздел</InputLabel>
                    <Select
                        labelId="partition-label"
                        id="partition"
                        value={leasson.partition !== null ? leasson.partition : ''}
                        name="partition"
                        label="Раздел"
                        onChange={handleChange}
                    >
                        {partitions.map((partition, index) =>
                            <MenuItem key={index} value={index}>{partition.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Input
                    onChange={handleChange}
                    value={leasson.time}
                    id="time"
                    name='time'
                    label="Время урока"
                    variant="outlined"
                />
            </Row>
            <QuillWrapper>
                <Quill
                    value={leasson.content}
                    onChange={handleChangeQuill}
                    modules={{
                        toolbar: QUILL_OPTIONS,
                    }}
                    placeholder="Содержание урока"
                />
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
                    <ButtonSave type="button" onClick={handleSave}>
                        Сохранить
                    </ButtonSave>
                </Management>
            </Actions>
        </LeassonAdditionWrapper>
    )
}