import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAuthMe, fetchUserData, updateUserAsync } from "./asyncActions";
import { Status } from "../products/types";
import { UserSliceState, UserData } from "./types";
import { toast } from "react-toastify";

const initialState: UserSliceState = {
    data: null,
    status: 'loading',
    message: null
}

export const UserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<UserData>) {
            state.data = action.payload;
        },
        setAvatarPath: (state, action) => {
            if (state.data?.avatarUrl) {
                const newData = { ...state.data };
                newData.avatarUrl = action.payload;
                updateUserAsync(newData);
                state.data.avatarUrl = action.payload;
            } else {
                toast.error('Failed to receive avatar');
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING
        })

        builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.data = null;
            state.status = Status.ERROR;
            state.message = action.payload.error.message;
        })

        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING
        })

        builder.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        })
    },

});

export const { updateUser, setAvatarPath } = UserSlice.actions;

export default UserSlice.reducer;