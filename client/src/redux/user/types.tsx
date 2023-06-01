import { TCartItem } from "../cart/types";

export interface UserSliceState {
    data: null | UserData,
    status: 'loading' | 'success' | 'error',
    message: null | string
}

export interface UserData {
    _id: string,
    email: string,
    name: string,
    lastName: string,
    avatarUrl: string,
    token: string,
    sex: string,
    address: string,
    cart: TCartItem[]
}

export interface IFetchUserResponse {
    error?: {
        message?: string
    }
    data?: UserData,
    status: 'error'
}

export type Avatar = {
    image: File
}



