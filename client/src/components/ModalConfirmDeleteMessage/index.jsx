import { useDispatch, useSelector } from "react-redux"
import { Dialog, DialogButtons, DialogTitle } from "./styled"
import { useState } from "react"
import { setIsOpenModalConfirmDeleteMessage } from "@/store/reducers"
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { socket } from "@/socket"

export const ModalConfirmDeleteMessage = () => {
    const dispatсh = useDispatch()
    const {
        modalConfirmDeleteMessage: {
            messageId,
            isOpen
        },
        chats: { selectedChat: { id: chatId } },
        user: { id: userId }
    } = useSelector(state => state)
    const [isForAll, setIsForAll] = useState(false)

    const handleClose = () => dispatсh(setIsOpenModalConfirmDeleteMessage(false))
    const handleChange = () => setIsForAll(!isForAll)
    const handleDelete = () => {
        socket.emit('deleteMessage', { chatId, messageId, isForAll, userId })
        handleClose()
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Удалить это сообщение?</DialogTitle>
            <FormControlLabel
                label='Удалить для всех'
                control={<Checkbox
                    checked={isForAll}
                    onChange={handleChange}
                />}
            />
            <DialogButtons>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleDelete}>Удалить</Button>
            </DialogButtons>
        </Dialog>
    )
}