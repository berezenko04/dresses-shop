import { addToCart, getCart, removeFromCart } from "@/API/cartService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addInCart, deleteFromCart } from "./slice";
import { CartItemInfo, CartState } from "./types";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async () => {
        const cart = await getCart();
        return cart;
    }
)

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (payload: CartItemInfo, { dispatch, getState }) => {
        const { cartItems } = getState().cart as CartState;
        const { id, size } = payload;
        const findItem = cartItems.find((obj) => (obj.id === id) && (obj.size === size));
        if (!findItem) {
            const data = await addToCart(id, size); 
            dispatch(addInCart(data));
        } else {
            toast.error('Item already in cart');
        }

    }
)

export const removeFromCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (payload: CartItemInfo, { dispatch }) => {
        const { id, size } = payload;
        await removeFromCart(id, size);
        dispatch(deleteFromCart(payload));
    }
)