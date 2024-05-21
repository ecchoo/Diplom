import PaperClip from '@/assets/icons/paperClip.svg'
import SendMessage from '@/assets/icons/sendMessage2.svg'
import { ButtonSendMessage, Input, MessageInput, TypeMessage } from './styled'

export const FormMessage = ({ value, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} >
            <MessageInput>
                <TypeMessage>
                    <img src={PaperClip} alt="Paper clip" />
                    <Input onChange={handleChange} value={value} placeholder="Написать сообщение" />
                </TypeMessage>
                <ButtonSendMessage>
                    <img src={SendMessage} alt="Send message" />
                </ButtonSendMessage>
            </MessageInput>
        </form>
    )
}