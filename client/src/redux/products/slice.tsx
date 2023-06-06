import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Status, IProductSliceState, IProducts, TProductItem } from "./types"
import { fetchProducts, fetchProduct } from "./asyncActions"


const initialState: IProductSliceState = {
    items: [],
    status: Status.LOADING,
    length: 0,
    maxPrice: 0
}

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING;
        })

        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProducts>) => {
            state.items = action.payload.products;
            state.length = action.payload.length;
            state.status = Status.SUCCESS;
            state.maxPrice = action.payload.maxPrice;
        })

        builder.addCase(fetchProducts.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })

        builder.addCase(fetchProduct.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchProduct.fulfilled, (state, action: PayloadAction<TProductItem>) => {
            state.items.push(action.payload);
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchProduct.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })
    }
})

export default ProductsSlice.reducer;