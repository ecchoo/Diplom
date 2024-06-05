import { useEffect } from "react"
import { ButtonCreateCourse, Container, Courses } from "./styled"
import { useDispatch, useSelector } from "react-redux"
import { clearCourseInfo, setCourse, setIsOpenCourseCreateUpdate, setTeacherCourses, setTypeCourseCreateUpdate } from "@/store/reducers"
import { getTeacherCourseList } from "@/api"
import { TeacherCardCourse } from "../TeacherCardCourse"
import { COURSE_CREATE_UPDATE_TYPES } from "@/constants"

export const TeacherCourses = () => {
    const dispatch = useDispatch()
    const { teacher: { teacherCourses: courses } } = useSelector(state => state)

    const handleAdd = () => {
        dispatch(setTypeCourseCreateUpdate(COURSE_CREATE_UPDATE_TYPES.CREATE))
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
                {courses?.map(({ id, name, logo, courseUsers }) =>
                    <TeacherCardCourse
                        courseId={id}
                        name={name}
                        logo={logo}
                        countStudents={courseUsers.length}
                    />
                )}
            </Courses>
        </Container>
    )
}