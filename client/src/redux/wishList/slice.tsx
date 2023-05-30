import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { WishListItem, WishListState } from "./types";
import { fetchWishList } from "./asyncActions";
import { removeFromWishList, addToWishList } from "@/API/wishListService";


const initialState: WishListState = {
    items: [],
    status: Status.LOADING
}

export const WishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        updateFavorite(state, action: PayloadAction<WishListItem>) {
            const findItem = state.items.find((obj) => obj._id === action.payload._id);
            if (findItem) {
                (async () => {
                    await removeFromWishList(action.payload._id);
                })();
                state.items = state.items.filter((obj) => obj._id !== action.payload._id);
            } else {
                (async () => {
                    await addToWishList(action.payload._id);
                })();
                state.items.push(action.payload);
            }
        }
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

export const { updateFavorite } = WishListSlice.actions;

export default WishListSlice.reducer;