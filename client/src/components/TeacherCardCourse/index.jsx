import { Actions, ButtonGo, Card, CardBody, CardFooter, CardHeader, CountStudentIcon, CourseInfo, CourseLogo, TitleCourse } from "./styled"
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { setActiveDashboardSection, setCourse, setDeleteCourseId, setIsOpenCourseCreateUpdate, setIsOpenModalConfirmDeleteCourse, setSelectedTeacherCourseId, setTypeCourseCreateUpdate } from "@/store/reducers"
import { getCourseById } from "@/api"
import ProfileIcon from '@/assets/icons/profile.svg'
import { COURSE_CREATE_UPDATE_TYPES, DASHBOARD_SECTIONS, TEACHER_COURSE } from "@/constants"

export const TeacherCardCourse = ({ courseId, name, logo, countStudents }) => {
    const dispatch = useDispatch()


    const handleEdit = async () => {

        const { data: { course: editCourse } } = await getCourseById(courseId)

        const partitions = editCourse.modules.flatMap((m, index) => {
            return m.partitions.map(partition => ({
                ...partition,
                // module: index
            }))
        })

        const leassons = partitions.flatMap((p, index) => {
            return p.leassons.map(leasson => ({
                ...leasson,
                // partition: index
            }))
        })

        const practicalTasks = leassons.flatMap(l => {
            return l.practicalTasks
        })

        dispatch(setTypeCourseCreateUpdate(COURSE_CREATE_UPDATE_TYPES.UPDATE))
        dispatch(setCourse({ ...editCourse, partitions, leassons, practicalTasks }))
        dispatch(setIsOpenCourseCreateUpdate(true))
    }

    const handleDelete = () => {
        dispatch(setIsOpenModalConfirmDeleteCourse(true))
        dispatch(setDeleteCourseId(courseId))
    }

    const handleGoCourse = () => {
        dispatch(setSelectedTeacherCourseId(courseId))
        dispatch(setActiveDashboardSection(DASHBOARD_SECTIONS.TEACHER_COURSE))
    }

    return (
        <Card>
            <CardHeader>
                <CourseLogo src={logo} alt="Course logo" />
                <Actions>
                    <IconButton onClick={handleEdit}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </Actions>
            </CardHeader>
            <CardBody>
                <TitleCourse>{name}</TitleCourse>
                <CourseInfo>
                    <CountStudentIcon src={ProfileIcon} alt="Count stuedent icon" />
                    <span>{countStudents} студентов</span>
                </CourseInfo>
            </CardBody>
            <CardFooter>
                <ButtonGo onClick={handleGoCourse}>Перейти</ButtonGo>
            </CardFooter>
        </Card>
    )
}