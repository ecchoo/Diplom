import { Avatar } from "@/UI"
import { LastMessageInfo, LastMessageText, Card, ChatPreview, NewMessagesCount, Time, ChatPreviewInfo, Title } from "./styled"
import { getTime } from "@/utils/getTime"

export const CardChatList = ({ chatLogo, lastMessage, newMessagesCount, title }) => {
    const timeLastMessage = getTime(lastMessage.createdAt)

    return (
        <Card>
            <ChatPreview>
                <Avatar src={chatLogo} alt="Chat logo" />
                <ChatPreviewInfo>
                    <Title>{title}</Title>
                    <LastMessageText>{lastMessage.text}</LastMessageText>
                </ChatPreviewInfo>
            </ChatPreview>
            <LastMessageInfo>
                <Time>{timeLastMessage}</Time>
                {
                    newMessagesCount ? (
                        <NewMessagesCount>
                            {newMessagesCount}
                        </NewMessagesCount>
                    ): (
                        null
                    )
                }

            </LastMessageInfo>
        </Card>
    )
}