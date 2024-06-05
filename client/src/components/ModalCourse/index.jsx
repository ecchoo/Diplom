import { useDispatch, useSelector } from "react-redux"
import { Dialog, DialogTitle, DialogContent, DialogHeader, Description, CourseLogo, Row, ListTeachers, ListTeachersItem, Modules, DialogContainer } from "./styled"
import { setIsOpenModalCourse } from "@/store/reducers"
import { Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { getCourseById } from "@/api"
import { Avatar } from "@/UI"
import { ModuleBlock } from "../ModuleBlock"

export const ModalCourse = () => {
    const dispatch = useDispatch()
    const { modalCourse: { isOpen, selectedCourseId } } = useSelector(state => state)

    const [selectedCourse, setSelectedCourse] = useState({})

    useEffect(() => {
        const fetchCourse = async () => {
            const { data: { course } } = await getCourseById(selectedCourseId)
            setSelectedCourse(course)
        }

        selectedCourseId && fetchCourse()
    }, [selectedCourseId])

    const handleClose = () => {
        dispatch(setIsOpenModalCourse(false))
    }

    return (
        selectedCourse.id ? (
            <Dialog scroll="paper" open={isOpen} onClose={handleClose} >
                <DialogContainer>
                    <DialogContent className="content">
                        <DialogHeader>
                            <DialogTitle>{selectedCourse.name}</DialogTitle>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </DialogHeader>
                        <Row>
                            <Description>{selectedCourse.description}</Description>
                            <CourseLogo src={selectedCourse.logo} alt="Course logo" />
                        </Row>
                        <ListTeachers>
                            {selectedCourse.teachers.map(teacher =>
                                <ListTeachersItem>
                                    <Avatar src={teacher.photo} alt="Teacher avatar" />
                                    <h1>{`${teacher.name}${teacher.isAuthor ? '(автор)' : ''}`}</h1>
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
                </DialogContainer>
            </Dialog >
        ) : (
            null
        )
    )
}