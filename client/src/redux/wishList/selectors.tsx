import { RootState } from "../store";

export const wishListSelector = (state: RootState) => state.wishList.items;
export const wishListStatusSelector = (state: RootState) => state.wishList.status;
export const wishListLengthSelector = (state: RootState) => state.wishList.length;