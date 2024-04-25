export const getTime = (dateParse) => {
    const date = new Date(dateParse)
    return `${date.getHours()}:${date.getMinutes()}`
}