import { Avatar } from "@/UI"
import { ChatActions, ChatContainer, ChatHeader, Input, MessageInput, Messages, Status, TypeMessage, User, UserInfo, UserName } from "./styled"
import AsideImg from '/aside1.png'
import { ButtonActions } from "../ButtonActions"
import { Message } from "../Message"
import PaperClip from '@/assets/icons/paperClip.svg'
import SendMessage from '@/assets/icons/sendMessage2.svg'
import io from "socket.io-client"
import { useEffect } from "react"

export const Chat = ({ name, chatId }) => {
    const socket = io.connect(process.env.REACT_APP_SERVER_URL)

    useEffect(() => {
        socket.emit('join', { name, chatId })
    }, [name, chatId])

    useEffect(() => {
        socket.on("message", ({ data }) => {
            // console.log(data)
        })
    }, [])

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