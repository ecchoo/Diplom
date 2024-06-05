import { useEffect } from "react"
import { ButtonCreateCourse, Container, Courses } from "./styled"
import { useDispatch, useSelector } from "react-redux"
import { clearCourseInfo, setCourse, setIsOpenCourseCreateUpdate, setTeacherCourses } from "@/store/reducers"
import { getTeacherCourseList } from "@/api"
import { TeacherCardCourse } from "../TeacherCardCourse"

export const TeacherCourses = () => {
    const dispatch = useDispatch()
    const { teacher: { teacherCourses: courses } } = useSelector(state => state)

    const handleAdd = () => {
        dispatch(setIsOpenCourseCreateUpdate(true))
        dispatch(clearCourseInfo())
    }

    useEffect(() => {
        const fetchTeacherCourseList = async () => {
            const { data: { teacherCourses } } = await getTeacherCourseList()
            dispatch(setTeacherCourses(teacherCourses))
        }

        fetchTeacherCourseList()
    }, [])

    return (
        <Container>
            <ButtonCreateCourse onClick={handleAdd}>
                Добавить
            </ButtonCreateCourse>
            <Courses>
                {courses?.map(course =>
                    <TeacherCardCourse
                        courseId={course.id}
                        name={course.name}
                        logo={course.logo}
                    />
                )}
            </Courses>
        </Container>
    )
}