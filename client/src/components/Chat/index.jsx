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
import { MESSAGE_TYPES } from "@/constants"

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
        socket.emit('join', { userId, chatId })

        socket.on("chatMessages", ({ data: { chatMessages } }) => {
            // console.log('messages', chatMessages)
            setMessages(chatMessages)
        })

        socket.on('messageReceived', (newMessage) => {
            setMessages(prevMessages => {
                const updatedMessages = [
                    ...prevMessages,
                    {
                        ...newMessage,
                        type: newMessage.user.id === userId ? MESSAGE_TYPES.OUTGOING : MESSAGE_TYPES.INCOMING
                    }
                ];
                return updatedMessages;
            });
        });
    }, [chatId])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newMessage.length) return

        setNewMessage('')
        socket.emit('sendMessage', { chatId, userId, text: newMessage })
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
                {messages.length && messages.map((message) => {
                    console.log('Map message', message)
                    return (
                        <Message
                            key={message.id}
                            userAvatar={message.user.photo}
                            messageText={message.text}
                            isIncoming={message.type === 'incoming'}
                        />
                    )
                }

                )}
            </Messages>
            <form onSubmit={handleSubmit} >
                <MessageInput>
                    <TypeMessage>
                        <img src={PaperClip} alt="Paper clip" />
                        <Input onChange={handleChange} value={newMessage} placeholder="Написать сообщение" />
                    </TypeMessage>
                    <button>
                        <img src={SendMessage} alt="Send message" />
                    </button>
                </MessageInput>
            </form>
        </ChatContainer>
    )
}