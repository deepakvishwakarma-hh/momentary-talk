import { createSlice } from '@reduxjs/toolkit'
import * as store from "../../../types/store"

const initialState: store.initial = {
    currentRoomId: undefined,
    user: {
        displayName: 'default',
        email: 'default',
        photoURL: "/dot.svg",
    },
    online: [{
        displayName: 'default',
        email: 'default',
        photoURL: "/dot.svg",
    }],
    room: {
        cat: 0,
        lastlong: 0,
        admin: {
            displayName: 'default',
            email: 'default',
            photoURL: "/dot.svg",
        }, chat: [
            {
                sender: {
                    displayName: 'default',
                    email: 'default',
                    photoURL: "/dot.svg",
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
        updateOnlineArr: (state, action) => {
            state.online = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, updateOnlineArr, updateRoomInfo, toggleSetting, updateRoomId } = counterSlice.actions

export default counterSlice.reducer
