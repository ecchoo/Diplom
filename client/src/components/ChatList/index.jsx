import { ChatListContainer, ChatSearch, ChatSearchIcon, ChatSearchInput, List } from "./styled"
import SearchIcon from '@/assets/icons/search.svg'
import AvatarPhoto from '/avatar.jpg'
import AsideImg from '/aside1.png'

import { Avatar } from "@/UI"
import { useEffect, useState } from "react"
import { getChatList } from "@/api"
import { CardChatList } from "../CardChatList"
import { CHAT_TYPES } from "@/constants"
import { getInterlocutor } from "@/utils"


export const ChatList = () => {
    const [chatList, setChatList] = useState([])

    useEffect(() => {
        const fetchChatList = async () => {
            const { userChats } = await getChatList()
            setChatList(userChats)
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
                    if(chat.type === CHAT_TYPES.DEFAULT){
                        const { photo, name } = getInterlocutor(chat.chatUsers)
                        chat.logo = photo
                        chat.name = name                 
                    } 

                    return <CardChatList
                        key={chat.id}
                        chatId={chat.id}
                        logo={chat.logo}
                        lastMessage={chat.lastMessage}
                        countNewMessages={chat.countNewMessages}
                        title={chat.name}
                    />
                })}
            </List>
        </ChatListContainer>
    )
}