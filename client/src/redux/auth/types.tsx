import { ProductItem } from "../products/types"

export interface AuthSliceState {
    data: null | UserData,
    status: 'loading' | 'success' | 'error',
    message: null | string
}

export interface UserData {
    _id: string,
    email: string,
    fullName: string,
    avatarUrl: string,
    token: string,
    wishList: ProductItem[],
    cart: TCartItem[]
}

export type TCartItem = {
    _id: string,
    title: string,
    price: number,
    discount: number,
    size: string,
    quantity: number,
    imageUrl: string
}

export interface IFetchUserResponse {
    error?: {
        message?: string
    }
    data?: UserData,
    status: 'error'
}



