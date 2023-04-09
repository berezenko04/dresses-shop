import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Status, ProductItem, ProductSliceState } from "./types"
import { fetchProducts } from "./asyncActions"


const initialState: ProductSliceState = {
    items: [],
    status: Status.LOADING
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

        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductItem[]>) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchProducts.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })
    }
})

export default ProductsSlice.reducer;