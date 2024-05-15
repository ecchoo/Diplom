import { Avatar } from "@/UI"
import { LastMessageInfo, LastMessage, Card, ChatPreview, NewMessagesCount, Time, ChatPreviewInfo, Title, LastMessageInterlocutor, LastMessageText, ChatInfo, CheckMark } from "./styled"
import { getTime } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedChat } from "@/store/reducers"
import { CHAT_TYPES, MESSAGE_STATUSES, MESSAGE_TYPES } from "@/constants"
import CheckMarkReadIcon from '@/assets/icons/markRead.svg'
import CheckMarkSendIcon from '@/assets/icons/markSend.svg'

export const CardChatList = ({ chatId }) => {
    const dispatch = useDispatch()
    const {
        chats: {
            selectedChat: {
                chatId: selectedChatId
            },
            chatList
        },
        user: {
            id: userId
        }
    } = useSelector(state => state)

    const {
        name,
        type,
        logo,
        lastMessage,
        lastNotification,
        countNewMessages,
        countUsers
    } = chatList.find(c => c.id === chatId)

    const checkMark = lastMessage?.status === MESSAGE_STATUSES.SENT
        ? CheckMarkSendIcon
        : CheckMarkReadIcon

    const time = (lastMessage || lastNotification)
        ? getTime((lastMessage || lastNotification).createdAt)
        : null


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
                                {lastMessage.user.name}:
                            </LastMessageInterlocutor>
                        ) : (
                            null
                        )}
                        <LastMessageText>
                            {lastMessage?.text || lastNotification?.text || 'Начните общение первым!'}
                        </LastMessageText>
                    </LastMessage>
                </ChatPreviewInfo>
            </ChatPreview>
            <ChatInfo>
                <LastMessageInfo>
                    {
                        lastMessage && userId === lastMessage.user.id ? (
                            <CheckMark src={checkMark} alt="Check mark" />
                        ) : (
                            null
                        )
                    }
                    <Time>{time}</Time>
                </LastMessageInfo>
                {
                    countNewMessages ? (
                        <NewMessagesCount>
                            {countNewMessages}
                        </NewMessagesCount>
                    ) : (
                        null
                    )
                }
            </ChatInfo>
        </Card>
    )
}