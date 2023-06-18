import { getComments } from "@/API/reviewsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (id: string) => {
        const comments = await getComments(id);
        return comments;
    }
)

// export const likeComment = createAsyncThunk(
//     'comments/like',
//     async (id: string) => {
//         const comment = await 
//     }
// )