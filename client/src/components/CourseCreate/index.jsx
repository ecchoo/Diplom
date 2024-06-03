import { Dialog, IconButton, Typography, Slide } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Container, DialogContent, AppBar, Toolbar, ButtonSaveCourse } from './styled'
import { forwardRef } from 'react'
import { FormModules } from '../FormModules'
import { FormPartitions } from '../FormPartitions'
import { FormLeassons } from '../FormLeassons'
import { FormMainInfo } from '../FormMainInfo'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpenCourseCreateUpdate } from '@/store/reducers'
import { createCourse } from '@/api'
import { transformCourse } from '@/utils'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const CourseCreate = () => {
    const dispatch = useDispatch()
    const { courseCreateUpdate: { isOpen, course } } = useSelector(state => state)

    const handleClose = () => {
        dispatch(setIsOpenCourseCreateUpdate(false))
    }

    const handleSave = async () => {
        const transformedCourse = transformCourse(course)
        console.log(transformedCourse)
        const res = await createCourse(transformedCourse)
        console.log(res)
    }

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Создание курса
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Container>
                    <FormMainInfo />
                    <FormModules />
                    <FormPartitions />
                    <FormLeassons />
                    <ButtonSaveCourse onClick={handleSave}>Сохранить курс</ButtonSaveCourse>
                </Container>
            </DialogContent>
        </Dialog>
    )
}
