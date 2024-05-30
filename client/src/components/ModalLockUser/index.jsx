import { useDispatch, useSelector } from "react-redux"
import { ButtonCancel, ButtonLock, Buttons, Dialog, DialogContent, DialogHeader, DialogTitle } from "./styled"
import { setIsOpenModalLockUser, setModerationMessages } from "@/store/reducers"
import { IconButton, MenuItem, TextField, Select, InputLabel, FormControl, Button } from "@mui/material"
import { Close } from "@mui/icons-material"
import { useState } from "react"
import { socket } from "@/socket"

export const ModalLockUser = () => {
    const dispatch = useDispatch()
    const {
        moderator: { moderationMessages },
        modalLockUser: { isOpen, messageId, moderationMessageId, userId, userName },
        user: { id: moderatorId }
    } = useSelector(state => state)

    const [formData, setFormData] = useState({
        reason: '',
        duration: '',
        accompanyingText: ''
    })

    const handleClose = () => {
        dispatch(setIsOpenModalLockUser(false))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        socket.emit('lockUser', { ...formData, moderatorId, messageId, userId })
        dispatch(setModerationMessages(moderationMessages.filter(m => m.id !== moderationMessageId)))
        handleClose()
    }

    const handleChange = (e) => {
        const { target: { name, value } } = e
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogHeader>
                <DialogTitle>Блокировка {userName}</DialogTitle>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogHeader>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="reason-label">Причина блокировки</InputLabel>
                        <Select
                            labelId="reason-label"
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            label="Причина блокировки" // добавлено свойство label
                        >
                            <MenuItem value="spam">Спам</MenuItem>
                            <MenuItem value="profanity">Ненормативная лексика</MenuItem>
                            <MenuItem value="insults">Оскорбления</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="duration-label">Время блокировки</InputLabel>
                        <Select
                            labelId="duration-label"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            label="Время блокировки"
                        >
                            <MenuItem value="10m">10 минут</MenuItem>
                            <MenuItem value="30m">30 минут</MenuItem>
                            <MenuItem value="1h">1 час</MenuItem>
                            <MenuItem value="1d">1 день</MenuItem>
                            <MenuItem value="forever">Навсегда</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="accompanyingText"
                        name="accompanyingText"
                        label="Сообщение"
                        multiline
                        rows={4}
                        value={formData.accompanyingText}
                        onChange={handleChange}
                    />
                    <Buttons>
                        <ButtonCancel onClick={handleClose}>Отменить</ButtonCancel>
                        <ButtonLock type="submit">Заблокировать</ButtonLock>
                    </Buttons>
                </form>
            </DialogContent>
        </Dialog>
    )
}
