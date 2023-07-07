import { addToWishList, getWishList, removeFromWishList } from "@/API/wishListService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishListSuccess, removeFromWishListSuccess } from "./slice";
import { TFetchWishList } from "./types";
import { RootState } from "../store";
import { toast } from "react-toastify";

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
        if (localStorage.getItem('token')) {
            const { items } = (getState() as RootState).wishList;
            const findItem = items.find((obj) => obj._id === itemId);

            if (findItem) {
                await removeFromWishList(itemId);
                dispatch(removeFromWishListSuccess(itemId));
            } else {
                const data = await addToWishList(itemId);
                dispatch(addToWishListSuccess(data));
            }
        } else {
            toast.error("Please login!");
        }
    }
);
