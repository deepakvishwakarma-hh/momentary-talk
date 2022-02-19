import { createSlice } from '@reduxjs/toolkit'

type Admin = {
    displayName: string,
    email: string,
    photoURL: string | boolean,
}

type chat = {
    sender: Admin,
    message: string,
    cat: number
}

type initialState = {
    currentRoomId: undefined | string
    user: Admin,
    room: {
        admin: Admin,
        chat: chat[]
    },
    toggles: {
        setting: boolean,
    }
}


const initialState: initialState = {
    currentRoomId: undefined,
    user: {
        displayName: 'default',
        email: 'default',
        photoURL: false,
    },
    room: {
        admin: {
            displayName: 'default',
            email: 'default',
            photoURL: false,
        }, chat: [
            {
                sender: {
                    displayName: 'default',
                    email: 'default',
                    photoURL: false,
                },
                message: 'dummy message ',
                cat: 1313223
            }
        ]
    },
    toggles: {
        setting: false,
    }
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload
        },
        updateRoomInfo: (state, action) => {
            state.room = action.payload
        },
        toggleSetting: (state, action) => {
            state.toggles.setting = action.payload
        },
        updateRoomId: (state, action) => {
            state.currentRoomId = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, updateRoomInfo, toggleSetting, updateRoomId } = counterSlice.actions

export default counterSlice.reducer
