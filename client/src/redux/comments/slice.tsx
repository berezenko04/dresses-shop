import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { fetchComments } from "./asyncActions";
import { IComments, ICommentsSliceState, IPostComment } from "./types";
import { addToComments } from "@/API/reviewsService";


const initialState: ICommentsSliceState = {
    items: [],
    status: Status.LOADING,
    length: 0
}

const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        createComment(state, action: PayloadAction<IPostComment>) {
            const { itemId, comment } = action.payload;
            state.items.push(comment);
            (async () => {
                await addToComments(itemId, comment);
            })();
        },
        likeComment(state, action) {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComments>) => {
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

export const { createComment } = CommentsSlice.actions;

export default CommentsSlice.reducer;