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
    cat: Date | number,
    admin: user,
    chat: chat[],
    online: user[],
    blocked: string[],
}

export type _custom = {
    _ATT: 0 | 1 | 2 | 3, //  auto termination time
    _roomConstruction: boolean, // room generation takes place
}

export type initial = {
    currentRoomId: undefined | string
    user: user,
    room: room,
    online: user[],
    toggles: {
        setting: boolean,
        loader: 'loading' | 'loaded',
        abilty: boolean,
    }, _custom: _custom
}

export type typeRootState = RootState
export type typeAppDispatch = AppDispatch
