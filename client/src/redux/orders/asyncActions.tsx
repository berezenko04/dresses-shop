import { createAsyncThunk } from "@reduxjs/toolkit";
import { TOrderItem } from "./types";
import { getOrders, postOrder } from "@/API/ordersService";
import { clearCart } from "@/API/cartService";


export const makeOrder = createAsyncThunk(
    'orders/make-order',
    async (data: TOrderItem) => {
        const response = await postOrder(data);
        await clearCart();
        return response;
    }
)

export const fetchOrders = createAsyncThunk(
    'order/fetch-orders',
    async () => {
        const data = await getOrders();
        return data;
    }
)