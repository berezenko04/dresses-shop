import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Status, ProductSliceState, Products, ProductItem } from "./types"
import { fetchProducts, fetchProduct } from "./asyncActions"


const initialState: ProductSliceState = {
    items: [],
    status: Status.LOADING,
    length: 0
}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Products>) => {
            state.items = action.payload.products;
            state.length = action.payload.length;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchProducts.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })

        builder.addCase(fetchProduct.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchProduct.fulfilled, (state, action: PayloadAction<ProductItem>) => {
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