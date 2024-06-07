import { IconButton } from "@mui/material"
import { ButtonCancel, ButtonSend, Buttons, Dialog, DialogContent, DialogHeader, DialogTitle, DropZone, DropZoneContainer, Placeholder, Preview } from "./styled"
import { Close, CloudDone } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setIsOpenModalTaskFile, setTasks } from "@/store/reducers"
import { useDropzone } from 'react-dropzone'
import { submitPracticalTask, uploadFile } from '@/api'
import { useState } from "react"

export const ModalTaskFile = () => {
    const dispatch = useDispatch()
    const {
        modalTaskFile: { isOpen, taskId },
        user: { tasks }
    } = useSelector(state => state)

    const [uploadedFile, setUploadedFile] = useState(null)

    const handleDrop = async (acceptedFiles) => {
        try {
            const { data: { filePath } } = await uploadFile({ file: acceptedFiles[0], type: 'task' })
            console.log(acceptedFiles[0])
            setUploadedFile({
                name: acceptedFiles[0].name,
                path: filePath
            })
        } catch (err) {
            console.error(err)
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        multiple: false
    })

    const handleClose = () => {
        dispatch(setIsOpenModalTaskFile(false))
    }

    const handleSend = async () => {
        try {
            const { data: { userPracticalTask } } = await submitPracticalTask({
                filePath: uploadedFile.path,
                practicalTaskId: taskId
            })
            console.log('new', userPracticalTask)
            setUploadedFile(null)
            dispatch(setIsOpenModalTaskFile(false))
            dispatch(setTasks({ ...tasks, userPracticalTask }))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogHeader>
                <DialogTitle>Сдать задание</DialogTitle>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogHeader>
            <DialogContent>
                <DropZoneContainer >
                    <DropZone {...getRootProps()}>
                        <input {...getInputProps()} />
                        {uploadedFile ? (
                            <Preview>
                                <CloudDone />
                                {uploadedFile.name}
                            </Preview>
                        ) : null}
                        {isDragActive ? (
                            <Placeholder>Перетащите сюда файл...</Placeholder>
                        ) : (
                            <>
                                <Placeholder>Файл с заданием</Placeholder>
                            </>
                        )}
                    </DropZone>
                </DropZoneContainer>
            </DialogContent>
            <Buttons>
                <ButtonCancel onClick={handleClose}>Отмена</ButtonCancel>
                <ButtonSend disabled={!uploadedFile} onClick={handleSend}>Отправить</ButtonSend>
            </Buttons>
        </Dialog>
    )
}
