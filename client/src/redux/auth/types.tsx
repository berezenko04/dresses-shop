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
    cart: ProductItem[]
}


export interface IFetchUserResponse {
    error?: {
        message?: string
    }
    data?: UserData,
    status: 'error'
}



