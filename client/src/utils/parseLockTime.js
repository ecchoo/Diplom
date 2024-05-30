export const parseLockTime = (lockTime) => {
    if(!lockTime) return null
    
    const timeUnits = {
        's': 1000,
        'm': 60000,
        'h': 3600000,
        'd': 86400000,
    }

    const timeValue = parseInt(lockTime.slice(0, -1))
    const timeUnit = lockTime.slice(-1)

    return timeValue * timeUnits[timeUnit]
}