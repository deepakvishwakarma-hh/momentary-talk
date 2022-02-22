import { NextRouter } from "next/router"

export const insert = (router: NextRouter) => {
    sessionStorage.setItem('user-flow-route', router.asPath)
}
export const extract = (router: NextRouter, fallback: string) => {
    const userFlowRoute = sessionStorage.getItem('user-flow-route')
    if (userFlowRoute) { router.push(userFlowRoute) } else {
        router.push(fallback)
    }
}

