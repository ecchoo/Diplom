import { MESSAGE_STATUSES, MESSAGE_TYPES } from "@/constants"
import { ButtonActions } from "../ButtonActions"
import { CheckMark, MessageAvatar, MessageContainer, MessageBody } from "./styled"
import CheckMarkReadIcon from '@/assets/icons/markRead.svg'
import CheckMarkSendIcon from '@/assets/icons/markSend.svg'

export const Message = ({ userAvatar, text, status, type }) => {
    const checkMark = status === MESSAGE_STATUSES.SENT ? CheckMarkSendIcon : CheckMarkReadIcon
    const isIncoming = type === MESSAGE_TYPES.INCOMING

    return (
        <MessageContainer isIncoming={isIncoming}>
            <MessageAvatar src={userAvatar} alt="User avatar" />
            <MessageBody isIncoming={isIncoming}>
                <p>{text}</p>
                {
                    !isIncoming ? (
                        <CheckMark src={checkMark} alt="Check mark" />
                    ) : null
                }
            </MessageBody>
            <ButtonActions direction='row' />
        </MessageContainer>
    )
}