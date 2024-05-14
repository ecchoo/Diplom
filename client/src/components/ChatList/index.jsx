import { ChatListContainer, ChatSearch, ChatSearchIcon, ChatSearchInput, List } from "./styled"
import SearchIcon from '@/assets/icons/search.svg'
import { useEffect } from "react"
import { getChatList } from "@/api"
import { CardChatList } from "../CardChatList"
import { useDispatch, useSelector } from "react-redux"
import { setChatList } from "@/store/reducers"

export const ChatList = () => {
    const dispatch = useDispatch()
    const {
        chats: {
            chatList,
        },
    } = useSelector(state => state)
    console.log(chatList)

    useEffect(() => {
        const fetchChatList = async () => {
            const { userChats } = await getChatList()
            dispatch(setChatList(userChats))
        }

        fetchChatList()
    }, [])

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