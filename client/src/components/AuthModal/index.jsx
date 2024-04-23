import { useDispatch, useSelector } from "react-redux"
import { AuthModalTitle, DialogAuth, DialogContent, DialogHeader } from "./styled"
import { AuthModalContent } from "../AuthModalContent"
import { IconButton } from "@mui/material"
import { Close } from '@mui/icons-material'
import { setIsOpenAuthModal } from "@/store/reducers"
import { AUTH_MODAL_TITLES } from "@/constants/authModalTitles"

export const AuthModal = () => {
    const dispatch = useDispatch()
    const { authModal: { isOpen, activeForm } } = useSelector(state => state)

    const handleClose = () => {
        dispatch(setIsOpenAuthModal(false))
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
                <AuthModalContent />
            </DialogContent>
        </DialogAuth>
    )
}