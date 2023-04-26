import { getAuthMe, getUserData } from "@/API/userService";
import { LoginFormValues } from "@/components/LoginForm";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
    '/auth/fetchUserData',
    async (params: LoginFormValues) => {
        try {
            const data = await getUserData(params);
            return data;
        } catch (error: any) {
            return error.response.data
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