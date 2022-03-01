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
        online: [{
            displayName: 'default',
            email: 'default',
            photoURL: "/dot.svg",
        }],
        blocked: ['none'],
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
        loader: 'loading',
        abilty: false,
    },
    _custom: {
        _ATT: 0,
        _roomConstruction: false
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
        },
        toggleLoader: (state, action) => {
            state.toggles.loader = action.payload
        },
        update_ATT: (state, action) => {
            state._custom._ATT = action.payload
        },
        update_roomConstruction: (state, action) => {
            state._custom._roomConstruction = action.payload
        },
        updateAbility: (state, action) => {
            state.toggles.abilty = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateAbility, updateUser, updateOnlineArr, updateRoomInfo, toggleSetting, updateRoomId, toggleLoader, update_ATT, update_roomConstruction } = counterSlice.actions;

export default counterSlice.reducer
