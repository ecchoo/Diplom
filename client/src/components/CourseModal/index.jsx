import { useDispatch, useSelector } from "react-redux"
import { Dialog, DialogTitle, DialogContent, DialogHeader, Description, CourseLogo, Row, ListTeachers, ListTeachersItem, Modules } from "./styled"
import { setIsOpenCourseModal } from "@/store/reducers"
import { Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { getCourseById } from "@/api"
import { strLimit } from "@/utils"
import { Avatar } from "@/UI"
import { ModuleBlock } from "../ModuleBlock"

export const CourseModal = () => {
    const dispatch = useDispatch()
    const { courseModal: { isOpen, selectedCourseId } } = useSelector(state => state)

    const [selectedCourse, setSelectedCourse] = useState({})

    useEffect(() => {
        const fetchCourse = async () => {
            const { course } = await getCourseById(selectedCourseId)
            setSelectedCourse(course)
        }

        selectedCourseId && fetchCourse()
    }, [selectedCourseId])

    const handleClose = () => {
        dispatch(setIsOpenCourseModal(false))
    }

    return (
        selectedCourse.id && <Dialog open={isOpen} onClose={handleClose} >
            <DialogHeader>
                <DialogTitle>{selectedCourse.name}</DialogTitle>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogHeader>
            <DialogContent>
                <Row>
                    <Description>{selectedCourse.description}</Description>
                    <CourseLogo src={selectedCourse.logo} alt="Course logo" />
                </Row>
                <ListTeachers>
                    {selectedCourse.courseTeachers.map(teacher =>
                        <ListTeachersItem>
                            <Avatar src={teacher.photo} alt="Teacher avatar" />
                            <h1>{`${teacher.name}${teacher.TeacherCourse.isAuthor ? '(автор)' : ''}`}</h1>
                        </ListTeachersItem>
                    )}
                </ListTeachers>
                <Modules>
                    {selectedCourse.modules.length && selectedCourse.modules.map(module =>
                        <ModuleBlock
                            name={module.name}
                            description={module.description}
                        />
                    )}
                </Modules>
            </DialogContent>
        </Dialog >
    )


}