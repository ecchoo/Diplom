export const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    // const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours}ч ${minutes}м ${seconds}с`
}