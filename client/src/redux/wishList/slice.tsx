import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { TWishListItem, IWishListState, IWishList } from "./types";
import { fetchWishList } from "./asyncActions";


const initialState: IWishListState = {
    items: [],
    status: Status.LOADING,
    length: 0
}

const WishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        removeFromWishListSuccess: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj._id !== action.payload);
            state.length--;
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

        builder.addCase(fetchWishList.fulfilled, (state, action: PayloadAction<IWishList>) => {
            state.items = action.payload.products;
            state.length = action.payload.length;
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