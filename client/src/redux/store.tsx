import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import products from './products/slice'
import comments from './comments/slice'
import user from './user/slice'

export const store = configureStore({
    reducer: {
        products,
        comments,
        user,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()