import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFetchMyReviews } from "./types";
import { getUserReviews } from "@/API/userService";


export const fetchMyReviews = createAsyncThunk(
    'my-reviews/fetchMyReviews',
    async (params: TFetchMyReviews) => {
        const { page, limit } = params;
        const reviews = await getUserReviews(page, limit);
        return reviews;
    }
)