import { getComments } from "@/API/dressesService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (id: string) => {
        const comments = await getComments(id);
        return comments;
    }
)