import { RootState } from "../store";

export const productsSelector = (state: RootState) => state.products.items;
export const productsStatusSelector = (state: RootState) => state.products.status;
export const productsLengthSelector = (state: RootState) => state.products.length;
export const productsMaxPriceSelector = (state: RootState) => state.products.maxPrice;