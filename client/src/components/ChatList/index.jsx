import { ChatListContainer, ChatSearch, ChatSearchIcon, ChatSearchInput, List } from "./styled"
import SearchIcon from '@/assets/icons/search.svg'
import { useEffect, useState } from "react"
import { getChatList } from "@/api"
import { CardChatList } from "../CardChatList"
import { CHAT_TYPES } from "@/constants"
import { getInterlocutor } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import { setChatList } from "@/store/reducers"

export const ChatList = () => {
    const dispatch = useDispatch()
    const {
        chats: {
            chatList,
        },
    } = useSelector(state => state)

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
                {chatList.length && chatList.map((chat) => {
                    const chatInfo = { ...chat }

                    if (chat.type === CHAT_TYPES.DEFAULT) {
                        const { photo, name } = getInterlocutor(chat.chatUsers)
                        chatInfo.logo = photo
                        chatInfo.name = name
                    }

                    return <CardChatList
                        key={chatInfo.id}
                        chatId={chatInfo.id}
                        logo={chatInfo.logo}
                        lastMessage={chatInfo.lastMessage}
                        countNewMessages={chatInfo.countNewMessages}
                        title={chatInfo.name}
                    />
                })}
            </List>
        </ChatListContainer>
    )
}