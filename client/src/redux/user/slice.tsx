import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAuthMe, fetchUserData, updateUserAsync } from "./asyncActions";
import { Status } from "../products/types";
import { IUserSliceState, IUserData } from "./types";
import { toast } from "react-toastify";

const initialState: IUserSliceState = {
    data: null,
    status: 'loading',
    message: null
}

interface IErrorPayload {
    error: {
        message: string;
        // другие свойства ошибки
    }
}

const UserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<IUserData>) {
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

        builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<IUserData>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchUserData.rejected, (state, action: PayloadAction<unknown>) => {
            state.data = null;
            state.status = Status.ERROR;
            state.message = (action.payload as IErrorPayload).error.message;
        })

        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING
        })

        builder.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<IUserData>) => {
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