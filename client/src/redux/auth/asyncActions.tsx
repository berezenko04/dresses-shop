import { getAuthMe, getUserData } from "@/API/userService";
import { LoginFormValues } from "@/components/LoginForm";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
    '/auth/fetchUserData',
    async (params: LoginFormValues) => {
        const data = await getUserData(params);
        console.log(data);
        return data;
    }
)

export const fetchAuthMe = createAsyncThunk(
    '/auth/fetchAuthMe',
    async () => {
        const data = await getAuthMe();
        return data;
    }
)