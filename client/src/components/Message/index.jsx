import { MESSAGE_STATUSES, MESSAGE_TYPES } from "@/constants"
import { ButtonActions } from "../ButtonActions"
import { MessageAvatar, MessageContainer, MessageBody, MessageOptions, MessageActions, MessageAction, ReadInfo, MessageActionIcon } from "./styled"
import CheckMarkReadIcon from '@/assets/icons/markRead.svg'
import CheckMarkSendIcon from '@/assets/icons/markSend.svg'
import PencilIcon from '@/assets/icons/pencil.png'
import DeletelIcon from '@/assets/icons/delete.png'
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useOnClickOutside } from "@/hooks"
import { setDeleteMessageId, setEditMessage, setIsOpenModalConfirmDeleteMessage } from "@/store/reducers"
import BadWordsNext from 'bad-words-next'
import ru from 'bad-words-next/data/ru.json'

export const Message = ({ messageId, userAvatar, text, status, type }) => {
    const badwords = new BadWordsNext({ data: ru })

    const dispatch = useDispatch()
    const ref = useRef(null)
    const [isShowActions, setIsShowActions] = useState(false)
    const checkMark = status === MESSAGE_STATUSES.SENT ? CheckMarkSendIcon : CheckMarkReadIcon
    const isIncoming = type === MESSAGE_TYPES.INCOMING

    const handleClickActions = () => setIsShowActions(!isShowActions)
    const handleClose = () => setIsShowActions(false)

    const handleClickDelete = () => {
        dispatch(setDeleteMessageId(messageId))
        dispatch(setIsOpenModalConfirmDeleteMessage(true))
    }

    const handleClickEdit = () => {
        dispatch(setEditMessage({ id: messageId, text }))
    }

    useOnClickOutside(ref, handleClose)

    return (
        <MessageContainer ref={ref} isIncoming={isIncoming}>
            <MessageAvatar src={userAvatar} alt="User avatar" />
            <MessageBody isIncoming={isIncoming}>
                <p>{badwords.filter(text)}</p>
                {
                    !isIncoming ? (
                        <img src={checkMark} alt="Check mark" />
                    ) : null
                }
            </MessageBody>
            {!isIncoming ? (
                <>
                    {isShowActions ? (
                        <MessageOptions>
                            <MessageActions>
                                <MessageAction onClick={handleClickEdit}>
                                    <MessageActionIcon src={PencilIcon} alt="Edit icon" />
                                    <span>Изменить</span>
                                </MessageAction>
                                <MessageAction onClick={handleClickDelete}>
                                    <MessageActionIcon src={DeletelIcon} alt="Delete icon" />
                                    <span>Удалить</span>
                                </MessageAction>
                            </MessageActions>
                            <ReadInfo>
                                <img src={CheckMarkReadIcon} alt="Read icon" />
                                <span>Сегодня в 16:09</span>
                            </ReadInfo>
                        </MessageOptions>
                    ) : null}
                    <ButtonActions direction='row' handleClick={handleClickActions} />
                </>
            ) : null}
        </MessageContainer>
    )
}