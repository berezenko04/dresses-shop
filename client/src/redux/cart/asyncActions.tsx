import { getCart } from "@/API/cartService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async () => {
        const cart = await getCart();
        return cart;
    }
)