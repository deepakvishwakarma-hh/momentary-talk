import * as store from "../../types/store"

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<store.typeAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<store.typeRootState> = useSelector