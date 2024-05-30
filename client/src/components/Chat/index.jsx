import { Avatar } from "@/UI"
import { ChatActions, ChatContainer, ChatHeader, Input, MessageInput, Messages, SubTitle, TypeMessage, ChatInfo, UserInfo, Title, ButtonSendMessage, MessagesWrapper } from "./styled"
import AsideImg from '/aside1.png'
import { ButtonActions } from "../ButtonActions"
import { Message } from "../Message"
import PaperClip from '@/assets/icons/paperClip.svg'
import SendMessage from '@/assets/icons/sendMessage2.svg'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MESSAGE_STATUSES, MESSAGE_TYPES } from "@/constants"
import { setChatList, setSelectedChat } from "@/store/reducers"
import { socket } from "@/socket"
import { ChatNotification } from "../ChatNotification"
import { FormMessage } from "../FormMessage"
import { EditMessage } from "../EditMessage"
import BadWordsNext from "bad-words-next"
import ru from 'bad-words-next/data/ru.json'
import { toast } from "react-toastify"

export const Chat = () => {
    const badwords = new BadWordsNext({ data: ru })

    const dispatch = useDispatch()
    const messagesRef = useRef(null)

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
        },
        editMessage: { isOpen: isOpenEditMessage }
    } = useSelector(state => state)


    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        socket.emit('join', { userId, chatId })

        const handleChatMessages = ({ messages, notifications }) => {
            const messagesAndNotification = (messages.concat(notifications)).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            setMessages(messagesAndNotification)
        }

        const handleMessageReceived = (newMessage) => {
            if (newMessage.chatId !== chatId) return

            const isIncoming = newMessage.user.id !== userId
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    ...newMessage,
                    type: isIncoming ? MESSAGE_TYPES.INCOMING : MESSAGE_TYPES.OUTGOING,
                    status: !isIncoming && newMessage.readers.length ? MESSAGE_STATUSES.READ : MESSAGE_STATUSES.SENT
                }
            ])
        }

        const handleMessagesRead = ({ readChatId }) => {
            if (readChatId !== chatId) return

            setMessages(prevMessages =>
                prevMessages.map(message =>
                    message.status === MESSAGE_STATUSES.SENT ? { ...message, status: MESSAGE_STATUSES.READ } : message
                )
            )
        }

        const handleMessageDeleted = ({ chatId: chatIdDeletedMessage, messageId, userId: senderId, isForAll }) => {
            const isUpdateMessages = chatId === chatIdDeletedMessage && (isForAll || senderId === userId)
            if (isUpdateMessages) {
                setMessages(prevMessages => prevMessages.filter(m => m.id !== messageId))
            }
        }

        const handleMessageUpdated = ({ chatId: chatIdUpdatedMessage, messageId, text }) => {
            if (chatId !== chatIdUpdatedMessage) return
            setMessages(prevMessages =>
                prevMessages.map(message => {
                    if (message.id === messageId) {
                        return { ...message, text }
                    }
                    return message
                })
            )
        }

        const handleUserLocked = (lockedUser) => {
            if (chatId === lockedUser.chatId) {
                dispatch(setSelectedChat({ id: 0 }))
            }
        }

        socket.on("chatMessages", handleChatMessages)
        socket.on('messageReceived', handleMessageReceived)
        socket.on('messagesRead', handleMessagesRead)
        socket.on('messageDeleted', handleMessageDeleted)
        socket.on('messageUpdated', handleMessageUpdated)
        socket.on('userLocked', handleUserLocked)

        return () => {
            socket.emit('exit', { chatId, userId })
            socket.off('chatMessages', handleChatMessages)
            socket.off('messageReceived', handleMessageReceived)
            socket.off('messagesRead', handleMessagesRead)
            socket.off('messageDeleted', handleMessageDeleted)
            socket.off('messageUpdated', handleMessageUpdated)
            socket.off('userLocked', handleUserLocked)
        }
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
            <MessagesWrapper ref={messagesRef}>
                <Messages className="messages">
                    {messages.length ? messages.map((message) => {
                        if (!message.type) {
                            return <ChatNotification text={message.text} />
                        }

                        return <Message
                            key={message.id}
                            messageId={message.id}
                            userAvatar={message.user.photo}
                            text={message.text}
                            status={message.status}
                            type={message.type}
                        />
                    }) : null}
                </Messages>
            </MessagesWrapper>
            {isOpenEditMessage ? (
                <EditMessage />
            ) : (
                <FormMessage
                    value={newMessage}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            )}
        </ChatContainer>
    )
}