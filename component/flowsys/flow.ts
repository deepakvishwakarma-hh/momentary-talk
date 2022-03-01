// Handle the flow of the application
import { NextRouter } from "next/router"

// inserting flow
export const insert = (router: NextRouter) => {
    sessionStorage.setItem('user-flow-route', router.asPath)
}

// extracting flow
export const extract = (router: NextRouter, fallback: string) => {
    const userFlowRoute = sessionStorage.getItem('user-flow-route')
    if (userFlowRoute) { router.push(userFlowRoute) } else {
        router.push(fallback)
    }
}

