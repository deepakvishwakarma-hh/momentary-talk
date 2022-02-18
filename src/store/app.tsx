import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/slices'

const store = configureStore({
    reducer: counterSlice,
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch