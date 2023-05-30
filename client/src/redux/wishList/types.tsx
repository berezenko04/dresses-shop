import { Status } from "../products/types";

export interface WishListState {
    items: WishListItem[],
    status: Status.LOADING | Status.SUCCESS | Status.ERROR
}

export type WishListItem = {
    _id: string,
    title: string,
    price: number,
    discount: number,
    images: string[],
    colors: string[]
}
