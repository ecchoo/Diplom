import { Dialog, IconButton, Typography, Slide } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Container, DialogContent, AppBar, Toolbar, ButtonSaveCourse } from './styled'
import { forwardRef, useEffect } from 'react'
import { FormModules } from '../FormModules'
import { FormPartitions } from '../FormPartitions'
import { FormLeassons } from '../FormLeassons'
import { FormMainInfo } from '../FormMainInfo'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setIsOpenCourseCreateUpdate } from '@/store/reducers'
import { createCourse, getCourseById, updateCourse } from '@/api'
import { transformCourse } from '@/utils'
import { COURSE_CREATE_UPDATE_TYPES } from '@/constants'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const DialogCourseCreateUpdate = () => {
    const dispatch = useDispatch()
    const { courseCreateUpdate: { isOpen, type } } = useSelector(state => state)

    const handleClose = () => {
        dispatch(setIsOpenCourseCreateUpdate(false))
    }

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        {type === COURSE_CREATE_UPDATE_TYPES.CREATE ? 'Создание курса' : 'Редактирование курса'}
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
                </Container>
            </DialogContent>
        </Dialog>
    )
}
