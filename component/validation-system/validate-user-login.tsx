import { useEffect, useState } from 'react'
import UserNotLogin from './login-alert'
export default function Validator({ children }) {
    const [state, setState] = useState<boolean>(false)
    useEffect(() => {
        (localStorage.getItem('token')) ? setState(true) : null
    }, [])
    return (
        <>
            {(state) ? children : <UserNotLogin />}
        </>
    )
}
