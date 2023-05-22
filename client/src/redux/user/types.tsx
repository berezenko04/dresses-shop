import { ProductItem } from "../products/types"

export interface UserSliceState {
    data: null | UserData,
    status: 'loading' | 'success' | 'error',
    message: null | string
}

type MakePartial<T> = {
    [K in keyof T]?: T[K];
};

export interface UserData {
    _id: string,
    email: string,
    name: string,
    lastName: string,
    avatarUrl: string,
    token: string,
    sex: string,
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

export type RemoveFromCart = {
    _id: string,
    size: string
}

export type UpdatedUser = MakePartial<UserData>

export type Avatar = {
    image: File 
}



