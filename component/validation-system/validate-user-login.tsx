import { useLayoutEffect } from 'react'
import React, { useState } from 'react'
import UserNotLogin from './user-not-login'
export default function Validator({ children }) {
    const [isUserLoggedIn, setUserCondition] = useState<boolean>(false)
    useLayoutEffect(() => { (localStorage.getItem('token') !== null) ? setUserCondition(true) : setUserCondition(false) }, [])
    return (
        <>
            {(isUserLoggedIn) ? children : <UserNotLogin />}
        </>
    )
}
