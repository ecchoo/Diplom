import { IconButton } from "@mui/material"
import { FormMessage } from "../FormMessage"
import { Container, EditIcon, EditMessageHeader, EditMessagePreview } from "./styled"
import PencilIcon from '@/assets/icons/pencil.png'
import { Close } from "@mui/icons-material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearEditMessage } from "@/store/reducers"
import { socket } from "@/socket"

export const EditMessage = () => {
    const dispatch = useDispatch()
    const {
        editMessage: { id, text },
        chats: {
            selectedChat: { id: chatId }
        }
    } = useSelector(state => state)
    const [editedMessage, setEditedMessage] = useState(text)

    const handleChange = (e) => setEditedMessage(e.target.value)
    const handleClose = () => dispatch(clearEditMessage())

    const handleSubmit = (e) => {
        e.preventDefault()

        socket.emit('updateMessage', {
            chatId,
            messageId: id,
            text: editedMessage
        })
        handleClose()
    }

    return (
        <Container>
            <EditMessageHeader>
                <EditMessagePreview>
                    <EditIcon src={PencilIcon} alt="Edit icon" />
                    <span>{text}</span>
                </EditMessagePreview>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </EditMessageHeader>
            <FormMessage
                value={editedMessage}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    )
}