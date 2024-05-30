import { useEffect, useState } from 'react'
import { parseLockTime } from '@/utils'

export const useLockCountdown = ({ lockTime, lockDate, handleUnlock }) => {
    const [remainingTime, setRemainingTime] = useState(() => {
        if (!lockTime || !lockDate) return null
        return parseLockTime(lockTime)
    })

    useEffect(() => {
        if (!lockTime || !lockDate) return

        const targetTime = new Date(lockDate).getTime() + parseLockTime(lockTime)

        const intervalId = setInterval(() => {
            const currentTime = new Date().getTime()
            const timeLeft = targetTime - currentTime

            if (timeLeft <= 0) {
                clearInterval(intervalId)
                setRemainingTime(0)
                handleUnlock()
            } else {
                setRemainingTime(timeLeft)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [lockTime, lockDate, handleUnlock])

    return remainingTime
}
