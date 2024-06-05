import { useEffect } from "react"
import { GitHubAuthButton } from "./styled"
import { GitHub } from '@mui/icons-material'

export const GitHubAuth = () => {
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`

    const handleClick = () => {
        window.location.assign(url)
    }

    return (
        <GitHubAuthButton type="button" onClick={handleClick}>
            <GitHub />
            <span>Вход черз аккаунт GitHub</span>
        </GitHubAuthButton>
    )
}