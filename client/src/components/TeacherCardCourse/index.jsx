import { Actions, Button, Card, CardBody, CardFooter, CardHeader, CourseInfo, CourseLogo, TitleCourse } from "./styled"
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { setCourse, setIsOpenCourseCreateUpdate } from "@/store/reducers"
import { getCourseById } from "@/api"

export const TeacherCardCourse = ({ courseId, name, logo }) => {
    const dispatch = useDispatch()


    const handleEdit = async () => {
        // dispatch(setEditCourseId(courseId))

        const { data: { course: editCourse } } = await getCourseById(courseId)

        const partitions = editCourse.modules.flatMap((m, index) => {
            return m.partitions.map(partition => ({
                ...partition,
                module: index
            }))
        })

        const leassons = partitions.flatMap((p, index) => {
            return p.leassons.map(leasson => ({
                ...leasson,
                partition: index
            }))
        })

        dispatch(setCourse({ ...editCourse, partitions, leassons }))
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

                </CourseInfo>
            </CardBody>
            <CardFooter>
                <Button>Перейти</Button>
            </CardFooter>
        </Card>
    )
}