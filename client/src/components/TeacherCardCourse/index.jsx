import { Actions, Button, Card, CardBody, CardFooter, CardHeader, CountStudentIcon, CourseInfo, CourseLogo, TitleCourse } from "./styled"
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { setCourse, setIsOpenCourseCreateUpdate, setTypeCourseCreateUpdate } from "@/store/reducers"
import { getCourseById } from "@/api"
import ProfileIcon from '@/assets/icons/profile.svg'
import { COURSE_CREATE_UPDATE_TYPES } from "@/constants"

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

    return (
        <Card>
            <CardHeader>
                <CourseLogo src={logo} alt="Course logo" />
                <Actions>
                    <IconButton onClick={handleEdit}>
                        <Edit />
                    </IconButton>
                    {/* <IconButton>
                        <Delete />
                    </IconButton> */}
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
                <Button>Перейти</Button>
            </CardFooter>
        </Card>
    )
}