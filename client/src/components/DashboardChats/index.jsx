import { useSelector } from "react-redux"
import { Chat } from "../Chat"
import { ChatList } from "../ChatList"
import { DashboardChatsContainer } from "./styled"

export const DashboardChats = () => {
    const { chats: { selectedChat: { id: chatId } } } = useSelector(state => state)

    return (
        <DashboardChatsContainer>
            <ChatList />
            {
                chatId ? (
                    <Chat />
                ) : (
                    null
                    // <span>Выбери</span>
                )
            }
        </DashboardChatsContainer>
    )
}