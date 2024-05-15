import { ChatListContainer, ChatSearch, ChatSearchIcon, ChatSearchInput, List } from "./styled"
import SearchIcon from '@/assets/icons/search.svg'
import { useEffect } from "react"
import { getChatList } from "@/api"
import { CardChatList } from "../CardChatList"
import { useDispatch, useSelector } from "react-redux"
import { setChatList } from "@/store/reducers"
import { socket } from "@/socket"
import { MESSAGE_TYPES } from "@/constants"

export const ChatList = () => {
    const dispatch = useDispatch()
    const {
        chats: {
            chatList,
            selectedChat: { id: selectedChatId }
        },
        user: {
            id: userId
        }
    } = useSelector(state => state)

    useEffect(() => {
        const fetchChatList = async () => {
            const { userChats } = await getChatList()
            dispatch(setChatList(userChats))
        }

        fetchChatList()
    }, [])

    useEffect(() => {
        socket.on('messageReceived', (newMessage) => {
            const isIncoming = newMessage.user.id !== userId
            
            const updatedChatList = chatList.map(chat => {
                if (chat.id !== newMessage.chatId) return chat

                const isSelectedChat = chat.id === selectedChatId
                const type = isIncoming ? MESSAGE_TYPES.INCOMING : MESSAGE_TYPES.OUTGOING
                const countNewMessages = isIncoming && !isSelectedChat? chat.countNewMessages + 1: chat.countNewMessages
                
                return {
                    ...chat,
                    countNewMessages,
                    lastMessage: { ...newMessage, type },
                }
            })

            dispatch(setChatList(updatedChatList))
        })
    })

    return (
        <ChatListContainer>
            <ChatSearch>
                <ChatSearchInput placeholder="Поиск" />
                <ChatSearchIcon src={SearchIcon} alt="Search icon" />
            </ChatSearch>
            <List>
                {chatList.length && chatList.map(({ id, name, type, logo, lastMessage, lastNotification, countNewMessages, countUsers }) =>
                    <CardChatList
                        key={id}
                        chatId={id}
                        name={name}
                        type={type}
                        logo={logo}
                        lastMessage={lastMessage}
                        lastNotification={lastNotification}
                        countUsers={countUsers}
                        countNewMessages={countNewMessages}
                    />
                )}
            </List>
        </ChatListContainer>
    )
}