import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { IMyReviewsState, TReviews } from "./types";
import { fetchMyReviews } from "./asyncActions";

const initialState: IMyReviewsState = {
    items: [],
    length: 0,
    status: Status.LOADING
}

const MyReviewsSlice = createSlice({
    name: 'my-reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMyReviews.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchMyReviews.fulfilled, (state, action: PayloadAction<TReviews>) => {
            state.items = action.payload.comments;
            state.length = action.payload.length;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchMyReviews.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })
    },
})

export default MyReviewsSlice.reducer;