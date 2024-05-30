import { useDispatch } from "react-redux"
import { Avatar, ButtonLockUser, ButtonShowChat, Card, CardActions, CardHeader, ChatName, Date, Info, MessageText, UserName } from "./styled"
import { setBlockingInfo, setIsOpenModalLockUser } from "@/store/reducers"
import { getTime } from "@/utils"

export const CardModerationMessage = ({
    userId,
    userName,
    userPhoto,
    messageId,
    moderationMessageId,
    chatName,
    messageText,
    date
}) => {
    const dispatch = useDispatch()

    const handleClickShowChat = () => {
        //
    }

    const handleClickLock = () => {
        dispatch(setIsOpenModalLockUser(true))
        dispatch(setBlockingInfo({ userId, messageId, userName, moderationMessageId }))
    }

    return (
        <Card>
            <CardHeader>
                <Avatar src={userPhoto} alt="User photo" />
                <Info>
                    <UserName>{userName}</UserName>
                    <Date>{getTime(date)}</Date>
                </Info>
            </CardHeader>
            <MessageText><ChatName>{chatName}: </ChatName>{messageText}</MessageText>
            <CardActions>
                <ButtonShowChat>Показать в чате</ButtonShowChat>
                <ButtonLockUser onClick={handleClickLock}>Заблокировать</ButtonLockUser>
            </CardActions>
        </Card>
    )
}