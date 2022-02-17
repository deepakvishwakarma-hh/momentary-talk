import { NextRouter } from "next/router"

export const updateUserFlow = (router: NextRouter) => {
    sessionStorage.setItem('user-flow-route', router.asPath)
    return null
}
export const extractUserFlow = (router: NextRouter, fallback: string) => {
    const userFlowRoute = sessionStorage.getItem('user-flow-route')
    if (userFlowRoute) { router.push(userFlowRoute) } else {
        router.push(fallback)
    }
    return null
}

