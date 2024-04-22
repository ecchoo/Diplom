import { Avatar } from "@/UI"
import { ChatActions, ChatContainer, ChatHeader, Input, MessageInput, Messages, Status, TypeMessage, User, UserInfo, UserName } from "./styled"
import AsideImg from '/aside1.png'
import { ButtonActions } from "../ButtonActions"
import { Message } from "../Message"
import PaperClip from '@/assets/icons/paperClip.svg'
import SendMessage from '@/assets/icons/sendMessage2.svg'

const messages = [
    {
        userAvatar: AsideImg,
        messageText: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem optio illum consequuntur voluptas saepe fugit libero molestias consectetur qui. Nostrum similique eos libero nobis quae aspernatur quos reprehenderit eveniet quidem.',
        isIncoming: true,
    },
    {
        userAvatar: AsideImg,
        messageText: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem optio illum consequuntur voluptas saepe fugit libero molestias consectetur qui. Nostrum similique eos libero nobis quae aspernatur quos reprehenderit eveniet quidem.',
        isIncoming: false,
    }
]

export const Chat = () => {
    return (
        <ChatContainer>
            <ChatHeader>
                <User>
                    <Avatar src={AsideImg} alt="User avatar" />
                    <UserInfo>
                        <UserName>Linna Medison</UserName>
                        <Status>Online</Status>
                    </UserInfo>
                </User>
                <ChatActions>
                    <ButtonActions direction='column' />
                </ChatActions>
            </ChatHeader>
            <Messages>
                {messages.map(({ userAvatar, messageText, isIncoming }) =>
                    <Message
                        userAvatar={userAvatar}
                        messageText={messageText}
                        isIncoming={isIncoming}
                    />
                )}
            </Messages>
            <MessageInput>
                <TypeMessage>
                    <img src={PaperClip} alt="Paper clip" />
                    <Input placeholder="Написать сообщение" />
                </TypeMessage>
                <img src={SendMessage} alt="Send message" />
            </MessageInput>
        </ChatContainer>
    )
}