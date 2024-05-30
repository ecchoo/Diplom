export const getTime = (dateParse) => {
    const date = new Date(dateParse)
    const today = new Date()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const time = `${hours}:${minutes}`

    if (date.toDateString() !== today.toDateString()) {
        const day = String(date.getDate()).padStart(2, '0')
        const monthNames = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ]
        const month = monthNames[date.getMonth()]
        const year = date.getFullYear() !== today.getFullYear() ? ` ${date.getFullYear()}` : ''
        return `${day} ${month}${year} ${time}`
    }

    return time
}