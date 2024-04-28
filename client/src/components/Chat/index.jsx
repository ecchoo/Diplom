import { Avatar } from "@/UI"
import { ChatActions, ChatContainer, ChatHeader, Input, MessageInput, Messages, SubTitle, TypeMessage, ChatInfo, UserInfo, Title } from "./styled"
import AsideImg from '/aside1.png'
import { ButtonActions } from "../ButtonActions"
import { Message } from "../Message"
import PaperClip from '@/assets/icons/paperClip.svg'
import SendMessage from '@/assets/icons/sendMessage2.svg'
import io from "socket.io-client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Chat = () => {
    const socket = io.connect(process.env.REACT_APP_SERVER_URL)

    const {
        user: {
            id: userId
        },
        selectedChat: {
            id: chatId,
            logo,
            title,
            subTitle
        }
    } = useSelector(state => state)

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        socket.emit('join', { chatId })

        socket.on("chatMessages", ({ data: { chatMessages } }) => {
            setMessages(chatMessages)
        })
    }, [chatId])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newMessage.length) return

        // socket.emit('sendMessage', { newMessage, userId })
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    return (
        <ChatContainer>
            <ChatHeader>
                <ChatInfo>
                    <Avatar src={logo} alt="Chat logo" />
                    <UserInfo>
                        <Title>{title}</Title>
                        <SubTitle>{subTitle}</SubTitle>
                    </UserInfo>
                </ChatInfo>
                <ChatActions>
                    <ButtonActions direction='column' />
                </ChatActions>
            </ChatHeader>
            <Messages>
                {messages.length && messages.map((message) =>
                    <Message
                        key={message.id}
                        userAvatar={message.user.photo}
                        messageText={message.message.text}
                        isIncoming={message.type === 'incoming'}
                    />
                )}
            </Messages>
            <form onSubmit={handleSubmit} >
                <MessageInput>
                    <TypeMessage>
                        <img src={PaperClip} alt="Paper clip" />
                        <Input onChange={handleChange} placeholder="Написать сообщение" />
                    </TypeMessage>
                    <button>
                        <img src={SendMessage} alt="Send message" />
                    </button>
                </MessageInput>
            </form>
        </ChatContainer>
    )
}