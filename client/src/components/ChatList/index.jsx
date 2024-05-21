import { ChatListContainer, ChatSearch, ChatSearchIcon, ChatSearchInput, List } from "./styled"
import SearchIcon from '@/assets/icons/search.svg'
import { useEffect, useState } from "react"
import { getChatList } from "@/api"
import { CardChatList } from "../CardChatList"
import { useDispatch, useSelector } from "react-redux"
import { setChatList } from "@/store/reducers"
import { socket } from "@/socket"
import { MESSAGE_STATUSES, MESSAGE_TYPES } from "@/constants"

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

    const [search, setSearch] = useState('')

    const fetchChatList = async () => {
        const { userChats } = await getChatList({ search })
        dispatch(setChatList(userChats))
    }

    const handleChange = async (e) => setSearch(e.target.value)

    useEffect(() => {
        fetchChatList()
    }, [search])

    useEffect(() => {
        socket.on('messageReceived', (newMessage) => {
            const isIncoming = newMessage.user.id !== userId

            const updatedChatList = chatList.map(chat => {
                if (chat.id !== newMessage.chatId) return chat

                const isSelectedChat = chat.id === selectedChatId

                const type = isIncoming ? MESSAGE_TYPES.INCOMING : MESSAGE_TYPES.OUTGOING
                const status = !isIncoming && newMessage.readers.length ? MESSAGE_STATUSES.READ : MESSAGE_STATUSES.SENT
                const countNewMessages = isIncoming && !isSelectedChat ? chat.countNewMessages + 1 : chat.countNewMessages

                return {
                    ...chat,
                    countNewMessages,
                    lastMessage: { ...newMessage, type, status },
                }
            })

            dispatch(setChatList(updatedChatList))
        })

        socket.on('messagesRead', ({ readerId, readChatId }) => {
            const updatedChatList = chatList.map(chat => {

                const isReadedChat = chat.id === readChatId

                if (readerId === userId) {
                    return { ...chat, countNewMessages: isReadedChat ? 0 : chat.countNewMessages }
                }

                if (isReadedChat && userId === chat.lastMessage?.user?.id) {
                    return { ...chat, lastMessage: { ...chat.lastMessage, status: MESSAGE_STATUSES.READ } }
                }

                return chat
            })

            dispatch(setChatList(updatedChatList))
        })

        socket.on('messageDeleted', ({ chatId, userId: senderId, messageId, isForAll, lastMessage }) => {
            const updatedChatList = chatList.map(chat => {
                if ((chat.lastMessage.id === messageId && (isForAll || userId === senderId))) {
                    return { ...chat, lastMessage }
                }

                return chat
            })

            dispatch(setChatList(updatedChatList))
        })

        socket.on('messageUpdated', ({ messageId, text }) => {
            const updatedChatList = chatList.map(chat => {
                if (chat.lastMessage.id === messageId) {
                    return { ...chat, lastMessage: { ...chat.lastMessage, text } }
                }

                return chat
            })

            dispatch(setChatList(updatedChatList))
        })
    })

    return (
        <ChatListContainer>
            <ChatSearch>
                <ChatSearchInput onChange={handleChange} placeholder="Поиск" />
                <ChatSearchIcon src={SearchIcon} alt="Search icon" />
            </ChatSearch>
            <List>
                {chatList.length ? (
                    chatList.map(({ id }) =>
                        <CardChatList key={id} chatId={id} />
                    )
                ) : (
                    null
                )}
            </List>
        </ChatListContainer>
    )
}