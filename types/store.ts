import { RootState, AppDispatch } from "../src/store/app"

export type user = {
    displayName: string,
    email: string,
    photoURL: string,
}

export type chat = {
    sender: user,
    message: string,
    cat: number
}
export type room = {
    lastlong: number,
    cat: Date,
    admin: user,
    chat: chat[],
    online: user[]
}

export type initial = {
    currentRoomId: undefined | string
    user: user,
    room: any,
    online: user[],
    toggles: {
        setting: boolean,
    }
}

export type typeRootState = RootState
export type typeAppDispatch = AppDispatch
