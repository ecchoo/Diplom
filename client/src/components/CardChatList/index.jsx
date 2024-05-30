import { Avatar } from "@/UI";
import {
    LastMessageInfo,
    LastMessage,
    Card,
    ChatPreview,
    NewMessagesCount,
    Time,
    ChatPreviewInfo,
    Title,
    LastMessageInterlocutor,
    LastMessageText,
    ChatInfo,
    CheckMark,
    LockIcon,
    RemainingTime,
    CardContainer,
    Lockout,
} from "./styled";
import { formatTime, getTime } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "@/store/reducers";
import { CHAT_TYPES, DURATIONS_BLOCKING, MESSAGE_STATUSES } from "@/constants";
import CheckMarkReadIcon from "@/assets/icons/markRead.svg";
import CheckMarkSendIcon from "@/assets/icons/markSend.svg";
import { toast } from "react-toastify";
import Lock from "@/assets/icons/lock.svg";
import { useLockCountdown } from "@/hooks";
import { socket } from "@/socket";

export const CardChatList = ({
    chatId,
    name,
    type,
    logo,
    lastMessage,
    lastNotification,
    countNewMessages,
    chatUsers,
    blocked,
}) => {
    const dispatch = useDispatch();
    const {
        chats: {
            selectedChat: { chatId: selectedChatId },
            // chatList,
        },
        user: { id: userId },
    } = useSelector((state) => state)

    const handleUnlock = () => {
        socket.emit('unlockUser', blocked.id)
    }

    const remainingTime = useLockCountdown({
        lockDate: blocked?.createdAt,
        lockTime: blocked?.duration,
        handleUnlock: handleUnlock
    })

    const checkMark =
        lastMessage?.status === MESSAGE_STATUSES.SENT
            ? CheckMarkSendIcon
            : CheckMarkReadIcon;

    const time = (lastMessage || lastNotification)
        ? getTime((lastMessage || lastNotification).createdAt)
        : null;

    const handleClick = () => {
        if (selectedChatId === chatId) return;

        if (blocked) {
            const { text } = DURATIONS_BLOCKING.find(
                (d) => d.value === blocked.duration
            );

            return toast(`Вы заблокированны в этом чате на ${text}`);
        }

        dispatch(
            setSelectedChat({
                id: chatId,
                title: name,
                subTitle:
                    type === CHAT_TYPES.DEFAULT
                        ? "В сети"
                        : `${chatUsers.length} участников`,
                logo: logo,
            })
        );
    };

    return (
        <Card onClick={handleClick}>
            <CardContainer isBlocked={blocked !== null}>
                <ChatPreview>
                    <Avatar src={logo} alt="Chat logo" />
                    <ChatPreviewInfo>
                        <Title>{name}</Title>
                        <LastMessage>
                            {type === CHAT_TYPES.GROUP && lastMessage ? (
                                <LastMessageInterlocutor>
                                    {lastMessage.user.name}:
                                </LastMessageInterlocutor>
                            ) : null}
                            <LastMessageText>
                                {lastMessage?.text ||
                                    lastNotification?.text ||
                                    "Начните общение первым!"}
                            </LastMessageText>
                        </LastMessage>
                    </ChatPreviewInfo>
                </ChatPreview>
                <ChatInfo>
                    <LastMessageInfo>
                        {lastMessage && userId === lastMessage.user.id ? (
                            <CheckMark src={checkMark} alt="Check mark" />
                        ) : null}
                        <Time>{time}</Time>
                    </LastMessageInfo>
                    {countNewMessages ? (
                        <NewMessagesCount>{countNewMessages}</NewMessagesCount>
                    ) : null}
                </ChatInfo>
            </CardContainer>
            {blocked ? (
                <Lockout>
                    <RemainingTime>{formatTime(remainingTime)}</RemainingTime>
                    <LockIcon src={Lock} alt="Lock icon" />
                </Lockout>
            ) : null}
        </Card>
    );
};
