import { RootState } from "../store";

export const cartSelector = (state: RootState) => state.cart.cartItems;
export const cartTotalPrice = (state: RootState) => state.cart.totalPrice; 