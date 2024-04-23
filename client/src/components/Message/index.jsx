import { ButtonActions } from "../ButtonActions"
import { MessageAvatar, MessageContainer, MessageText } from "./styled"

export const Message = ({ userAvatar, messageText, isIncoming  }) => {
    return (
        <MessageContainer isIncoming={isIncoming}>
            <MessageAvatar src={userAvatar} alt="User avatar" />
            <MessageText isIncoming={isIncoming}>{messageText}</MessageText>
            <ButtonActions direction='row' />
        </MessageContainer>
    )
}