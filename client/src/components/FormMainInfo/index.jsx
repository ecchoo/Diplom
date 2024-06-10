import { Form, FormRow, TextField } from "@/UI";
import { FormControl, FormHelperText, InputLabel, MenuItem, Typography } from "@mui/material";
import { MultipleSelect } from "../MultipleSelect";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setCourseTeachers, setTeacherCourses } from "@/store/reducers";
import { useEffect, useState } from "react";
import { getTeacherList } from "@/api/teachers";
import { CourseLoogoAddition } from "../CourseLoogoAddition";
import { ButtonSave, Select } from "./styled";
import { createCourse, updateCourse } from "@/api";
import { StatusCodes } from "http-status-codes";
import { convertErrorsValidation } from "@/utils";
import { DIFFICULTY_LEVELS, FIELDS_STUDY } from "@/constants";

export const FormMainInfo = () => {
    const dispatch = useDispatch();
    const {
        courseCreateUpdate: { course },
        teacher: { teacherCourses },
        user: { id: userId }
    } = useSelector(state => state);

    const [teacherList, setTeacherList] = useState([]);
    const [errorsValidation, setErrorsValidation] = useState({});

    const handleChange = (e) => {
        const { target: { name, value } } = e;
        dispatch(setCourse({ ...course, [name]: value }));
    };

    const handleChangeTeachers = (selectedTeachers) => {
        // Ensure the current teacher (userId) is always included and cannot be removed
        if (!selectedTeachers.some(teacher => teacher.id === userId)) {
            const currentUser = teacherList.find(teacher => teacher.id === userId);
            if (currentUser) {
                selectedTeachers.push(currentUser);
            }
        }
        dispatch(setCourseTeachers(selectedTeachers));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('course', course)
        try {
            if (!course.id) {
                const { data: { newCourse } } = await createCourse(course);
                dispatch(setCourse({ ...course, id: newCourse.id }));
                dispatch(setTeacherCourses([...teacherCourses, newCourse]));
            } else {
                await updateCourse(course);
                const updatedTeacherCourses = teacherCourses.map(teacherCourse => {
                    if (teacherCourse.id === course.id) {
                        return { ...teacherCourse, ...course };
                    }

                    return teacherCourse;
                });
                dispatch(setTeacherCourses(updatedTeacherCourses));
            }
            setErrorsValidation({});
        } catch (err) {
            console.error(err);
            if (err?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                const convertedErrors = convertErrorsValidation(err.response.data.errors);
                setErrorsValidation(convertedErrors);
            }
        }
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            const { data: { teacherList: teachers } } = await getTeacherList();
            setTeacherList(teachers);
            const me = teachers.find(t => t.userId === userId);
            if (me) {
                dispatch(setCourseTeachers([me]));
            }
        };

        fetchTeachers();
    }, []);

    const initialTeachers = teacherList.filter(t =>
        course.teachers.some(courseTeacher => t.id === courseTeacher.id)
    );

    const me = teacherList.find(t => t.userId === userId);

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
                    teacherList?.length ? (
                        <MultipleSelect
                            options={teacherList}
                            placeholder='Преподаватели'
                            onChange={handleChangeTeachers}
                            error={errorsValidation?.teachers}
                            helperText={errorsValidation?.teachers}
                            initialValues={initialTeachers}
                            disableOptions={[me.id]}  // Disable the current user from being deselected
                        />
                    ) : null
                }
            </FormRow>
            <FormRow>
                <FormControl error={errorsValidation?.difficultyLevel}>
                    <InputLabel id="difficultyLevel-label">Уровень сложности</InputLabel>
                    <Select
                        labelId="difficultyLevel-label"
                        id="difficultyLevel"
                        value={course.difficultyLevel}
                        name="difficultyLevel"
                        label="Уровень сложности"
                        onChange={handleChange}
                    >
                        {DIFFICULTY_LEVELS.map(({ text, value }) =>
                            <MenuItem key={value} value={value}>{text}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errorsValidation?.difficultyLevel}</FormHelperText>
                </FormControl>
                <FormControl error={errorsValidation?.fieldStudy}>
                    <InputLabel id="fieldStudy-label">Область изучения</InputLabel>
                    <Select
                        labelId="fieldStudy-label"
                        id="fieldStudy"
                        value={course.fieldStudy}
                        name="fieldStudy"
                        label="Область изучения"
                        onChange={handleChange}
                    >
                        {FIELDS_STUDY.map(({ text, value }) =>
                            <MenuItem key={value} value={value}>{text}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errorsValidation?.fieldStudy}</FormHelperText>
                </FormControl>
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
    );
};
