import { useDispatch, useSelector } from "react-redux"
import { Dialog, DialogButtons, DialogTitle } from "./styled"
import { useState } from "react"
import { setIsOpenModalConfirmDeleteCourse, setTeacherCourses } from "@/store/reducers"
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { socket } from "@/socket"
import { deleteCourse } from "@/api"
import { toast } from "react-toastify"

export const ModalConfirmDeleteСourse = () => {
    const dispatсh = useDispatch()
    const {
        modalConfirmDeleteCourse: {
            courseId,
            isOpen
        },
        teacher: { teacherCourses }
    } = useSelector(state => state)

    const handleClose = () => dispatсh(setIsOpenModalConfirmDeleteCourse(false))

    const handleDelete = async () => {
        try {
            await deleteCourse(courseId)
            handleClose()
            toast('Курс удален')
            dispatсh(setTeacherCourses(teacherCourses.filter(c => c.id !== courseId)))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Вы действительно хотите удалить этот курс</DialogTitle>
            <DialogButtons>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleDelete}>Удалить</Button>
            </DialogButtons>
        </Dialog>
    )
}