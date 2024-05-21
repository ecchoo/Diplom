module.exports = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '0123456789'
    const specialChars = '!@#$%^&*()_+'

    const randomChar = (charset) => charset[Math.floor(Math.random() * charset.length)]

    const randomCharFrom = (charsets) => randomChar(charsets[Math.floor(Math.random() * charsets.length)])

    const password = [
        randomChar(lowercaseChars),
        randomChar(lowercaseChars.toUpperCase()),
        randomChar(digitChars),
        randomChar(specialChars),
        randomCharFrom([lowercaseChars, lowercaseChars.toUpperCase(), digitChars, specialChars]),
        randomCharFrom([lowercaseChars, lowercaseChars.toUpperCase(), digitChars, specialChars])    
    ].join('')

    return password.split('').sort(() => Math.random() - 0.5).join('')
}