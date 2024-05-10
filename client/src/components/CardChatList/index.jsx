import { Avatar } from "@/UI"
import { LastMessageInfo, LastMessageText, Card, ChatPreview, NewMessagesCount, Time, ChatPreviewInfo, Title } from "./styled"
import { getTime, strLimit } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedChat } from "@/store/reducers"

export const CardChatList = ({ chatId, logo, lastMessage, countNewMessages, title }) => {
    const dispatch = useDispatch()
    const { chats: { selectedChat: { chatId: selectedChatId } } } = useSelector(state => state)

    const isSelectedChat = selectedChatId === chatId
    const timeLastMessage = getTime(lastMessage.createdAt)
    const lastMessageText = strLimit(lastMessage.text, 35)

    const handleClick = () => {
        if (isSelectedChat) return
        // const chat = chats.find(c => c.id === chatId)
        // console.log(chat)
        dispatch(setSelectedChat({
            id: chatId,
            title: title,
            subTitle: 'В сети',
            logo: logo,
        }))
    }

    return (
        <Card onClick={handleClick}>
            <ChatPreview>
                <Avatar src={logo} alt="Chat logo" />
                <ChatPreviewInfo>
                    <Title>{title}</Title>
                    <LastMessageText>{lastMessageText}</LastMessageText>
                </ChatPreviewInfo>
            </ChatPreview>
            <LastMessageInfo>
                <Time>{timeLastMessage}</Time>
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