import { getAuthMe, getUserData, updateUserData } from "@/API/userService";
import { LoginFormValues } from "@/components/LoginForm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData, UserSliceState } from "./types";
import { updateUser } from "./slice";
import { toast } from "react-toastify";
import { RootState } from "../store";

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

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (payload: Partial<UserData>, { dispatch, getState }) => {
        const { data } = getState().user as UserSliceState;
        console.log(data);

        if (data) {
            try {
                const updatedData = await updateUserData({ ...payload });
                dispatch(updateUser(updatedData));
                toast.success('Data updated successfully');
            } catch (err) {
                toast.error('Failed to save data while updating user');
                console.log(err);
                throw err;
            }
        }
    }
);
