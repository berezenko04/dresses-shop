import { Status } from "../products/types";

export interface IWishListState {
    items: TWishListItem[],
    status: Status.LOADING | Status.SUCCESS | Status.ERROR,
    length: number
}

export interface IWishList {
    products: TWishListItem[],
    length: number
}

export type TWishListItem = {
    _id: string,
    title: string,
    price: number,
    discount: number,
    images: string[],
    colors: string[]
}

export type TFetchWishList = {
    page?: number,
    limit?: number
}
