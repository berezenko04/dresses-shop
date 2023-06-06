import { Status } from "../products/types";

export interface IWishListState {
    items: TWishListItem[],
    status: Status.LOADING | Status.SUCCESS | Status.ERROR
}

export type TWishListItem = {
    _id: string,
    title: string,
    price: number,
    discount: number,
    images: string[],
    colors: string[]
}
