import { ProductItem, Status } from "../products/types";

export interface WishListState {
    items: ProductItem[],
    status: Status.LOADING | Status.SUCCESS | Status.ERROR
}