import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { fetchComments } from "./asyncActions";
import { Comments, CommentsSliceState } from "./types";


const initialState: CommentsSliceState = {
    items: [],
    status: Status.LOADING,
    length: 0
}

export const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comments>) => {
            state.items = action.payload.comments;
            state.length = action.payload.length;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchComments.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })
    }
})

export default CommentsSlice.reducer;