import { Notification } from "./styled"

export const ChatNotification = ({ text }) => {
    return (
        <Notification>
            {text}
        </Notification>
    )
}