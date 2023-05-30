import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductItem, Status } from "../products/types";
import { WishListState } from "./types";
import { fetchWishList } from "./asyncActions";
import { removeFromWishList } from "@/API/wishListService";
import { addToWishList } from "@/API/wishListService";


const initialState: WishListState = {
    items: [],
    status: Status.LOADING
}

export const WishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        updateFavorite(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj._id === action.payload);
            if (findItem) {
                (async () => {
                    await removeFromWishList(action.payload);
                })();
                state.items.filter((obj) => obj._id !== action.payload);
            } else {
                (async () => {
                    await addToWishList(action.payload);
                })();
                const newItem = state.items.find((obj) => obj._id === action.payload);
                newItem && state.items.push(newItem);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWishList.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchWishList.fulfilled, (state, action: PayloadAction<ProductItem[]>) => {
            console.log(action.payload);
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