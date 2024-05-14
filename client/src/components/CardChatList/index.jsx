import { Avatar } from "@/UI"
import { LastMessageInfo, LastMessage, Card, ChatPreview, NewMessagesCount, Time, ChatPreviewInfo, Title, LastMessageInterlocutor, LastMessageText } from "./styled"
import { getTime } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedChat } from "@/store/reducers"
import { CHAT_TYPES } from "@/constants"

export const CardChatList = ({ chatId, name, type, logo, lastMessage, lastNotification, countNewMessages, countUsers }) => {
    const dispatch = useDispatch()
    const {
        chats: {
            selectedChat: {
                chatId: selectedChatId
            }
        },
    } = useSelector(state => state)


    const handleClick = () => {
        if (selectedChatId === chatId) return

        dispatch(setSelectedChat({
            id: chatId,
            title: name,
            subTitle: type === CHAT_TYPES.DEFAULT ? 'В сети' : `${countUsers} участников`,
            logo: logo,
        }))
    }

    return (
        <Card onClick={handleClick}>
            <ChatPreview>
                <Avatar src={logo} alt="Chat logo" />
                <ChatPreviewInfo>
                    <Title>{name}</Title>
                    <LastMessage>
                        {type === CHAT_TYPES.GROUP && lastMessage ? (
                            <LastMessageInterlocutor>
                                {lastMessage.user.name}
                            </LastMessageInterlocutor>
                        ) : (
                            null
                        )}
                        <LastMessageText>
                            {lastMessage?.text || lastNotification.text}
                        </LastMessageText>
                    </LastMessage>
                </ChatPreviewInfo>
            </ChatPreview>
            <LastMessageInfo>
                <Time>{getTime(lastMessage?.createdAt || lastNotification.createdAt)}</Time>
                {
                    countNewMessages ? (
                        <NewMessagesCount>
                            {countNewMessages}
                        </NewMessagesCount>
                    ) : (
                        null
                    )
                }
            </LastMessageInfo>
        </Card>
    )
}