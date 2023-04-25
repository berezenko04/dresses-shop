import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import products from './products/slice'
import comments from './comments/slice'
import auth from './auth/slice'

export const store = configureStore({
    reducer: {
        products,
        comments,
        auth
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()