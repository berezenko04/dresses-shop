import { addToWishList, getWishList, removeFromWishList } from "@/API/wishListService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishListSuccess, removeFromWishListSuccess } from "./slice";
import { IWishListState, TFetchWishList } from "./types";
import { } from 'react-redux'

export const fetchWishList = createAsyncThunk(
    'wishlist/fetchWishList',
    async (args: TFetchWishList) => {
        const { page = 1, limit = 0 } = args;
        const wishlist = await getWishList(page, limit);
        return wishlist;
    }
)

export const updateFavorite = createAsyncThunk(
    'wishlist/update',
    async (itemId: string, { dispatch, getState }) => {
        const { items } = getState().wishList as IWishListState;
        const findItem = items.find((obj) => obj._id === itemId);

        if (findItem) {
            await removeFromWishList(itemId);
            dispatch(removeFromWishListSuccess(itemId));
        } else {
            const data = await addToWishList(itemId);
            dispatch(addToWishListSuccess(data));
        }
    }
);
