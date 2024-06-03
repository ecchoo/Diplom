import { useEffect } from "react"
import { ButtonCreateCourse } from "./styled"
import { CourseCreate } from "../CourseCreate"
import { useDispatch } from "react-redux"
import { setIsOpenCourseCreateUpdate } from "@/store/reducers"

export const TeacherCourses = () => {
    const dispatch = useDispatch()

    const handleAdd = () => {
        dispatch(setIsOpenCourseCreateUpdate(true))
    }

    return (
        <>
            <ButtonCreateCourse onClick={handleAdd}>
                Добавить
            </ButtonCreateCourse>
            <CourseCreate />
        </>
    )
}