import { Avatar } from "@/UI"
import { ChatActions, ChatContainer, ChatHeader, Input, MessageInput, Messages, SubTitle, TypeMessage, ChatInfo, UserInfo, Title, ButtonSendMessage } from "./styled"
import AsideImg from '/aside1.png'
import { ButtonActions } from "../ButtonActions"
import { Message } from "../Message"
import PaperClip from '@/assets/icons/paperClip.svg'
import SendMessage from '@/assets/icons/sendMessage2.svg'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MESSAGE_STATUSES, MESSAGE_TYPES } from "@/constants"
import { setChatList } from "@/store/reducers"
import { socket } from "@/socket"

export const Chat = () => {
    const dispatch = useDispatch()

    const {
        user: {
            id: userId
        },
        chats: {
            selectedChat: {
                id: chatId,
                logo,
                title,
                subTitle
            },
            chatList
        }
    } = useSelector(state => state)

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        socket.emit('join', { userId, chatId })

        socket.on("chatMessages", ({ chatMessages }) => {
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
                ]

                return updatedMessages
            })

            if (newMessage.user.id !== userId) {
                console.log('Сообщение мне')
            }

            const updatedChatList = chatList.map(chat =>
                chat.id === chatId ? {
                    ...chat,
                    lastMessage: {
                        ...newMessage,
                        type: newMessage.user.id === userId ? MESSAGE_TYPES.OUTGOING : MESSAGE_TYPES.INCOMING
                    }
                } : chat
            )

            dispatch(setChatList(updatedChatList))
        })

        socket.on('messagesRead', ({ readerId }) => {
            if (readerId === userId) {
                const updatedChatList = chatList.map(chat =>
                    chat.id === chatId ? { ...chat, countNewMessages: 0 } : chat
                )

                dispatch(setChatList(updatedChatList))
            } else {
                setMessages(prevMessages =>
                    prevMessages.map(message =>
                        message.status === MESSAGE_STATUSES.SENT ? { ...message, status: MESSAGE_STATUSES.READ } : message
                    )
                )
            }
        })
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
            <Messages className="messages">
                {messages.length && messages.map((message) =>
                    <Message
                        key={message.id}
                        userAvatar={message.user.photo}
                        text={message.text}
                        status={message.status}
                        type={message.type}
                    />
                )}
            </Messages>
            <form onSubmit={handleSubmit} >
                <MessageInput>
                    <TypeMessage>
                        <img src={PaperClip} alt="Paper clip" />
                        <Input onChange={handleChange} value={newMessage} placeholder="Написать сообщение" />
                    </TypeMessage>
                    <ButtonSendMessage>
                        <img src={SendMessage} alt="Send message" />
                    </ButtonSendMessage>
                </MessageInput>
            </form>
        </ChatContainer>
    )
}