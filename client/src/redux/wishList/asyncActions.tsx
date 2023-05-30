import { getWishList } from "@/API/wishListService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWishList = createAsyncThunk(
    'wishlist/fetchWishList',
    async () => {
        const wishlist = await getWishList();
        return wishlist;
    }
)