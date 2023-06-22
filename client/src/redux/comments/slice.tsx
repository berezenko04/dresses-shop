import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../products/types";
import { dislikeComment, fetchComments, likeComment } from "./asyncActions";
import { IActionComment, IComments, ICommentsSliceState, IPostComment, TComment } from "./types";
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

        builder.addCase(likeComment.fulfilled, (state, action: PayloadAction<IActionComment>) => {
            const findComment = state.items.find((item) => item._id === action.payload.id);

            if (findComment) {
                if (findComment.likes.includes(action.payload.info)) {
                    findComment.likes = findComment.likes.filter((id) => id !== action.payload.info);
                } else {
                    findComment.likes.push(action.payload.info);
                }

                if (findComment.dislikes.includes(action.payload.info)) {
                    findComment.dislikes = findComment.dislikes.filter((id) => id !== action.payload.info);
                }
            }
        });

        builder.addCase(dislikeComment.fulfilled, (state, action: PayloadAction<IActionComment>) => {
            const findComment = state.items.find((item) => item._id === action.payload.id);

            if (findComment) {
                if (findComment.dislikes.includes(action.payload.info)) {
                    findComment.dislikes = findComment.dislikes.filter((id) => id !== action.payload.info);
                } else {
                    findComment.dislikes.push(action.payload.info);
                }

                if (findComment.likes.includes(action.payload.info)) {
                    findComment.likes = findComment.likes.filter((id) => id !== action.payload.info);
                }
            }
        })


    }
})

export const { createComment } = CommentsSlice.actions;

export default CommentsSlice.reducer;