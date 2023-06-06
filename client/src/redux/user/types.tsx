import { TCartItem } from "../cart/types";

export interface IUserSliceState {
    data: null | IUserData,
    status: 'loading' | 'success' | 'error',
    message: null | string
}

export interface IUserData {
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
    data?: IUserData,
    status: 'error'
}

export type Avatar = {
    image: File
}



