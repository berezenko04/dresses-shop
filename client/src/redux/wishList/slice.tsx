import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { WishListItem, WishListState } from "./types";
import { fetchWishList } from "./asyncActions";


const initialState: WishListState = {
    items: [],
    status: Status.LOADING
}

export const WishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        removeFromWishListSuccess: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj._id !== action.payload);
        },
        addToWishListSuccess: (state, action: PayloadAction<WishListItem>) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWishList.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchWishList.fulfilled, (state, action: PayloadAction<WishListItem[]>) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchWishList.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })
    },
})

export const { removeFromWishListSuccess, addToWishListSuccess } = WishListSlice.actions;

export default WishListSlice.reducer;