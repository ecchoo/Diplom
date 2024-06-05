import { useDispatch, useSelector } from "react-redux"
import { AuthModalTitle, DialogAuth, DialogContent, DialogHeader } from "./styled"
import { ModalAuthContent } from "../ModalAuthContent"
import { IconButton } from "@mui/material"
import { Close } from '@mui/icons-material'
import { setIsOpenModalAuth, setUser } from "@/store/reducers"
import { AUTH_MODAL_TITLES } from "@/constants/authModalTitles"
import { useEffect } from "react"
import { authWithGitHub } from "@/api"

export const ModalAuth = () => {
    const dispatch = useDispatch()
    const { modalAuth: { isOpen, activeForm } } = useSelector(state => state)

    const handleClose = () => {
        dispatch(setIsOpenModalAuth(false))
    }

    useEffect(() => {
        const fetchAuthWithGithub = async (code) => {
            try {
                const { data } = await authWithGitHub(code)
                dispatch(setUser(data))

            } catch (err) {
                console.error(err)
            }
        }

        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')

        code && fetchAuthWithGithub(code)
    }, [])

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