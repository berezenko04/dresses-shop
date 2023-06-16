import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import products from './products/slice'
import comments from './comments/slice'
import user from './user/slice'
import cart from './cart/slice'
import wishList from './wishList/slice'
import myReviews from './myReviews/slice'
import orders from './orders/slice'

export const store = configureStore({
    reducer: {
        products,
        comments,
        user,
        cart,
        wishList,
        myReviews,
        orders
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()