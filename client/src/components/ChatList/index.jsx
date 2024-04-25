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

// const chats = [
//     {
//         user: {
//             name: 'Linna Medison',
//             photo: AsideImg,
//         },
//         lastMessage: {
//             text: 'Last message',
//             time: '10:01'
//         },
//         newMessagesCount: 2,
//     },
//     {
//         user: {
//             name: 'Test Test',
//             photo: AvatarPhoto,
//         },
//         lastMessage: {
//             text: 'First message',
//             time: '10:00'
//         },
//         newMessagesCount: 1,
//     }
// ]

export const ChatList = () => {
    const [chatList, setChatList] = useState([])

    useEffect(() => {
        const fetchChatList = async () => {
            const { userChats } = await getChatList()
            console.log(chatList)
            setChatList(userChats)
        }

        fetchChatList()
    }, [])

    console.log('chatList', chatList)

    // chatList.length && chatList.forEach((chat) => console.log('chat', chat))

    // chatList.length && chatList.map((chat) => {
    //     if (chat.type === CHAT_TYPES.DEFAULT) {
    //         const interlocutor = getInterlocutor(chat.chatUsers)
    //         chat.logo = interlocutor.photo
    //     }

    //     return chat
    // })

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
                        chatLogo={chat.logo}
                        lastMessage={chat.lastMessage}
                        newMessagesCount={chat.newMessages.length}
                        title={chat.name}
                    />
                })}
            </List>
        </ChatListContainer>
    )
}