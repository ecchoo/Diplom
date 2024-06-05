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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const DialogCourseCreateUpdate = () => {
    const dispatch = useDispatch()
    const { courseCreateUpdate: { isOpen, course } } = useSelector(state => state)

    const handleClose = () => {
        dispatch(setIsOpenCourseCreateUpdate(false))
    }

    // const handleSave = async () => {
    //     const transformedCourse = transformCourse(course)

    //     const res = editCourseId
    //         ? await updateCourse({ id: editCourseId, ...transformedCourse })
    //         : await createCourse(transformedCourse)

    //     console.log(res)
    // }

    // useEffect(() => {
    //     const fetchCourse = async () => {
    //         const { data: { course: editCourse } } = await getCourseById(editCourseId)

    //         const partitions = editCourse.modules.flatMap((m, index) => {
    //             return m.partitions.map(partition => ({
    //                 ...partition,
    //                 module: index
    //             }))
    //         })

    //         const leassons = partitions.flatMap((p, index) => {
    //             return p.leassons.map(leasson => ({
    //                 ...leasson,
    //                 partition: index
    //             }))
    //         })

    //         dispatch(setCourse({ ...editCourse, partitions, leassons }))
    //     }

    //     editCourseId && fetchCourse()
    // }, [editCourseId])

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
                </Container>
            </DialogContent>
        </Dialog>
    )
}
