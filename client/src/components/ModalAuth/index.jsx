import { useDispatch, useSelector } from "react-redux"
import { AuthModalTitle, DialogAuth, DialogContent, DialogHeader } from "./styled"
import { ModalAuthContent } from "../ModalAuthContent"
import { IconButton } from "@mui/material"
import { Close } from '@mui/icons-material'
import { setIsOpenModalAuth } from "@/store/reducers"
import { AUTH_MODAL_TITLES } from "@/constants/authModalTitles"

export const ModalAuth = () => {
    const dispatch = useDispatch()
    const { modalAuth: { isOpen, activeForm } } = useSelector(state => state)

    const handleClose = () => {
        dispatch(setIsOpenModalAuth(false))
    }

    return (
        <DialogAuth open={isOpen} onClose={handleClose}>
            <DialogHeader>
                <AuthModalTitle>{AUTH_MODAL_TITLES[activeForm]}</AuthModalTitle>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogHeader>
            <DialogContent>
                <ModalAuthContent />
            </DialogContent>
        </DialogAuth>
    )
}