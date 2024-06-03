import { Form, FormRow, TextField } from "@/UI"
import { Box, Button, Typography } from "@mui/material"
import { MultipleSelect } from "../MultipleSelect"
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setCourseAuthors, setCourseTeachers } from "@/store/reducers"
import { useEffect, useState } from "react"
import { getTeacherList } from "@/api/teachers"
import { Dropzone } from "../DropZone"
import { uploadFile } from "@/api"

export const FormMainInfo = () => {
    const dispatch = useDispatch()
    const {
        courseCreateUpdate: { course },
        user: { id: userId }
    } = useSelector(state => state)

    const [teachers, setTeachers] = useState([])

    const handleChange = (e) => {
        const { target: { name, value } } = e
        dispatch(setCourse({ ...course, [name]: value }))
    }

    const handleChangeTeachers = (selectedTeachers) => {
        dispatch(setCourseTeachers(selectedTeachers))
    }

    const handleChangeAuthors = (selectedAuthors) => {
        dispatch(setCourseAuthors(selectedAuthors))
    }

    const handleDrop = async (file) => {
        const { data: { filePath } } = await uploadFile({ file, type: 'logo' })
        dispatch(setCourse({ ...course, logo: filePath }))
    }

    useEffect(() => {
        const fetchTeachers = async () => {
            const { data: { teacherList } } = await getTeacherList()

            setTeachers(teacherList)
        }

        fetchTeachers()
    }, [])

    return (
        <Form>
            <Typography variant="h6" component="div">
                Основная информация о курсе
            </Typography>
            <FormRow>
                <TextField id="name" onChange={handleChange} name='name' label="Название курса" variant="outlined" />
                <MultipleSelect
                    options={teachers}
                    placeholder='Преподаватели'
                    onChange={handleChangeTeachers}
                />
                <MultipleSelect
                    options={teachers}
                    placeholder='Авторы'
                    onChange={handleChangeAuthors}
                />
            </FormRow>
            <FormRow>
                <TextField
                    id="description"
                    onChange={handleChange}
                    name='description'
                    multiline
                    rows={8}
                    label="Описание курса"
                    variant="outlined"
                />
                <Dropzone onDrop={handleDrop} />
            </FormRow>
        </Form>
    )
}