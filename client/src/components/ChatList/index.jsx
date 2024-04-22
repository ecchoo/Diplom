import { ChatListContainer, ChatSearch, ChatSearchIcon, ChatSearchInput, LastMessageInfo, LastMessageText, List, ListItem, ListItemUser, NewMessagesCount, Time, UserMessage, UserName } from "./styled"
import SearchIcon from '@/assets/icons/search.svg'
import AvatarPhoto from '/avatar.jpg'
import AsideImg from '/aside1.png'

import { Avatar } from "@/UI"

const chats = [
    {
        user: {
            name: 'Linna Medison',
            photo: AsideImg,
        },
        lastMessage: {
            text: 'Last message',
            time: '10:01'
        },
        newMessagesCount: 2,
    },
    {
        user: {
            name: 'Test Test',
            photo: AvatarPhoto,
        },
        lastMessage: {
            text: 'First message',
            time: '10:00'
        },
        newMessagesCount: 1,
    }
]

export const ChatList = () => {
    return (
        <ChatListContainer>
            <ChatSearch>
                <ChatSearchInput placeholder="Поиск" />
                <ChatSearchIcon src={SearchIcon} alt="Search icon" />
            </ChatSearch>
            <List>
                {chats.map(({ user, lastMessage, newMessagesCount }) => 
                    <ListItem>
                        <ListItemUser>
                            <Avatar src={user.photo} alt="User avatar" />
                            <UserMessage>
                                <UserName>{user.name}</UserName>
                                <LastMessageText>{lastMessage.text}</LastMessageText>
                            </UserMessage>
                        </ListItemUser>
                        <LastMessageInfo>
                            <Time>{lastMessage.time}</Time>
                            <NewMessagesCount>
                                {newMessagesCount}
                            </NewMessagesCount>
                        </LastMessageInfo>
                    </ListItem>
                )}
            </List>
        </ChatListContainer>
    )
}