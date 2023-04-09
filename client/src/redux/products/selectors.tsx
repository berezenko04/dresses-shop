import { RootState } from "../store";

export const productsSelector = (state: RootState) => state.products.items;
export const productsStatusSelector = (state: RootState) => state.products.status;