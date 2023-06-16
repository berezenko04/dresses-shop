import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Status } from "../products/types";
import { fetchOrders, makeOrder } from "./asyncActions";
import { IFetchOrders, IMakeOrder, IOrdersState } from "./types";


const initialState: IOrdersState = {
    status: Status.LOADING,
    orders: [],
    length: 0
}


const OrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeOrder.pending, (state) => {
            state.orders = [];
            state.status = Status.LOADING
        })

        builder.addCase(makeOrder.fulfilled, (state, action: PayloadAction<IMakeOrder>) => {
            state.orders.push(action.payload.orderItem);
            state.status = Status.SUCCESS;
            state.length = action.payload.length;
        })

        builder.addCase(makeOrder.rejected, (state) => {
            state.orders = [];
            state.status = Status.ERROR;
        })

        builder.addCase(fetchOrders.pending, (state) => {
            state.orders = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<IFetchOrders>) => {
            state.orders = action.payload.items;
            state.status = Status.SUCCESS;
            state.length = action.payload.length;
        })

        builder.addCase(fetchOrders.rejected, (state) => {
            state.orders = [];
            state.status = Status.ERROR;
        })
    }
})

export default OrdersSlice.reducer;