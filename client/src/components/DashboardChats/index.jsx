import { Chat } from "../Chat"
import { ChatList } from "../ChatList"
import { DashboardChatsContainer } from "./styled"

export const DashboardChats = () => {
    return (
        <DashboardChatsContainer>
            <ChatList />
            <Chat name='User1' chatId={1} />
        </DashboardChatsContainer>
    )
}