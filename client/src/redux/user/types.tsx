import { TCartItem } from "../cart/types";
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

export interface IFetchUserResponse {
    error?: {
        message?: string
    }
    data?: UserData,
    status: 'error'
}

export type UpdatedUser = MakePartial<UserData>

export type Avatar = {
    image: File
}



