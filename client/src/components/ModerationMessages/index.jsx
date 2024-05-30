import { getModerationMessages } from "@/api/moderator"
import { socket } from "@/socket"
import { useEffect, useState } from "react"
import { Container } from "./styled"
import { CardModerationMessage } from "../CardModerationMessage"
import { useDispatch, useSelector } from "react-redux"
import { setModerationMessages } from "@/store/reducers"

export const ModerationMessages = () => {
    const dispatch = useDispatch()
    const { moderator: { moderationMessages } } = useSelector(state => state)

    useEffect(() => {
        const fetchMessageModeration = async () => {
            try {
                const { data: { moderationMessages: messaages } } = await getModerationMessages()
                dispatch(setModerationMessages(messaages))
            } catch (err) {
                console.log(err)
            }
        }

        fetchMessageModeration()
    }, [])

    useEffect(() => {
        socket.on('messageContainsBadWords', (message) => {
            // проверка модера
            dispatch(setModerationMessages([...moderationMessages, message]))
        })
    })

    return (
        <Container>
            {moderationMessages.length ? (
                moderationMessages.map(({ id, createdAt, user, message, chat }) =>
                    <CardModerationMessage
                        key={id}
                        moderationMessageId={id}
                        userId={user.id}
                        userName={user.name}
                        userPhoto={user.photo}
                        chatId={chat.id}
                        chatName={chat.name}
                        messageId={message.id}
                        messageText={message.text}
                        date={createdAt}
                    />
                )
            ) : null}
        </Container>
    )
}