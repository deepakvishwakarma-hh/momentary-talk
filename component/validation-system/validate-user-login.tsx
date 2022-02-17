import { useEffect } from 'react'
import React, { useState } from 'react'
import UserNotLogin from './user-not-login'
export default function Validator({ children }) {
    const [isUserLoggedIn, setUserCondition] = useState<boolean>(false)
    useEffect(() => { (localStorage.getItem('token') !== null) ? setUserCondition(true) : setUserCondition(false) }, [])
    return (
        <>
            {(isUserLoggedIn) ? children : <UserNotLogin />}
        </>
    )
}
