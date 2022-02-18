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
    user: {
        displayName: '',
        email: '',
        photoURL: '',
    },
    room: {
        admin: {
            displayName: '',
            email: '',
            photoURL: false,
        }, chat: [
            {
                sender: {
                    displayName: '',
                    email: '',
                    photoURL: '',
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
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, updateRoomInfo, toggleSetting } = counterSlice.actions

export default counterSlice.reducer


// Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutab  