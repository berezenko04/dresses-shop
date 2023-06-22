import { dislikeReview, getComments, likeReview } from "@/API/reviewsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (id: string) => {
        const comments = await getComments(id);
        return comments;
    }
)

export const likeComment = createAsyncThunk(
    'comments/like',
    async (id: string) => {
        const info = await likeReview(id);
        return { info, id };
    }
)

export const dislikeComment = createAsyncThunk(
    'comments/dislike',
    async (id: string) => {
        const info = await dislikeReview(id);
        return { info, id };
    }
)