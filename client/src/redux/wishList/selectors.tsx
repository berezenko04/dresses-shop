import { RootState } from "../store";

export const wishListSelector = (state: RootState) => state.wishList.items;