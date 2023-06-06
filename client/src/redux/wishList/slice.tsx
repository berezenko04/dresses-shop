import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { TWishListItem, IWishListState } from "./types";
import { fetchWishList } from "./asyncActions";


const initialState: IWishListState = {
    items: [],
    status: Status.LOADING
}

const WishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        removeFromWishListSuccess: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj._id !== action.payload);
        },
        addToWishListSuccess: (state, action: PayloadAction<TWishListItem>) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWishList.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchWishList.fulfilled, (state, action: PayloadAction<TWishListItem[]>) => {
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