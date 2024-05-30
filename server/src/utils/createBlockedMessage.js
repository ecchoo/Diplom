const { DURATIONS_BLOCKING } = require("../constants/durationsBlocking")
const { REASONS_BLOCKING } = require("../constants/reasonsBlocking")


module.exports.createBlockedMessage = ({ chatName, duration, reason, accompanyingText }) => {
    const { text: reasonText } = REASONS_BLOCKING.find(r => r.value === reason)
    const { text: durationText } = DURATIONS_BLOCKING.find(d => d.value === duration)

    return `Вы заблокированы в чате ${chatName}. Время блокировки: ${durationText}, причина блокировки ${reasonText}. Сообщение от модератора: ${accompanyingText}`
}