import { Form, FormRow, TextField } from "@/UI"
import { Typography } from "@mui/material"
import { MultipleSelect } from "../MultipleSelect"
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setCourseAuthors, setCourseTeachers } from "@/store/reducers"
import { useEffect, useState } from "react"
import { getTeacherList } from "@/api/teachers"
import { CourseLoogoAddition } from "../CourseLoogoAddition"
import { ButtonSave } from "./styled"
import { createCourse, updateCourse } from "@/api"
import { StatusCodes } from "http-status-codes"
import { convertErrorsValidation } from "@/utils"

export const FormMainInfo = () => {
    const dispatch = useDispatch()
    const {
        courseCreateUpdate: { course },
    } = useSelector(state => state)

    const [teachers, setTeachers] = useState([])
    const [errorsValidation, setErrorsValidation] = useState({})

    const handleChange = (e) => {
        const { target: { name, value } } = e
        dispatch(setCourse({ ...course, [name]: value }))
    }

    const handleChangeTeachers = (selectedTeachers) => {
        dispatch(setCourseTeachers(selectedTeachers))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!course.id) {
                const { data: { newCourse: { id } } } = await createCourse(course);
                dispatch(setCourse({ ...course, id }))
            } else {
                await updateCourse(course)
            }
            setErrorsValidation({})
        } catch (err) {
            console.error(err)
            if (err?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors)
                setErrorsValidation(convertedErrors)
            }
        }
    };


    useEffect(() => {
        const fetchTeachers = async () => {
            const { data: { teacherList } } = await getTeacherList()
            setTeachers(teacherList)
        }

        fetchTeachers()
    }, [])

    const initialTeachers = teachers.filter(teacher =>
        course.teachers.some(courseTeacher => teacher.id === courseTeacher.id)
    )

    return (
        <Form onSubmit={handleSubmit}>
            <Typography variant="h6" component="div">
                Основная информация о курсе
            </Typography>
            <FormRow>
                <TextField
                    id="name"
                    onChange={handleChange}
                    name='name'
                    label="Название курса"
                    variant="outlined"
                    value={course?.name}
                    error={errorsValidation?.name}
                    helperText={errorsValidation?.name}
                />
                {
                    teachers?.length ? (
                        <MultipleSelect
                            options={teachers}
                            placeholder='Преподаватели'
                            onChange={handleChangeTeachers}
                            error={errorsValidation?.teachers}
                            helperText={errorsValidation?.teachers}
                            initialValues={initialTeachers}
                        />
                    ) : null
                }
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
                    value={course?.description}
                    error={errorsValidation?.description}
                    helperText={errorsValidation?.description}
                />
                <CourseLoogoAddition
                    error={errorsValidation?.logo}
                    helperText={errorsValidation?.logo}
                />
            </FormRow>
            <ButtonSave type="submit">Сохранить</ButtonSave>
        </Form>
    )
}