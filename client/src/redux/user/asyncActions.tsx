import { getAuthMe, getUserData } from "@/API/userService";
import { LoginFormValues } from "@/components/LoginForm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from "./types";

export const fetchUserData = createAsyncThunk(
    '/auth/fetchUserData',
    async (params: LoginFormValues, { rejectWithValue }) => {
        try {
            const data = await getUserData(params);
            return data as UserData;
        } catch (error: any) {
            const errorResponse = error.response?.data || error;
            return rejectWithValue({ error: errorResponse });
        }
    }
)

export const fetchAuthMe = createAsyncThunk(
    '/auth/fetchAuthMe',
    async () => {
        const data = await getAuthMe();
        return data;
    }
)
