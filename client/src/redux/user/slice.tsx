import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAuthMe, fetchUserData } from "./asyncActions";
import { Status } from "../products/types";
import { UserSliceState, UserData, UpdatedUser } from "./types";
import { updateUserData } from "@/API/userService";
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
        updateUser(state, action: PayloadAction<UpdatedUser>) {
            if (state.data) {
                const newData = { ...state.data };
                for (let key in action.payload) {
                    if (action.payload.hasOwnProperty(key)) {
                        if (newData[key] !== action.payload[key]) {
                            newData[key] = action.payload[key];
                        }
                    }
                }
                try {
                    (async () => {
                        await updateUserData(newData._id, newData);
                        toast.success('Data updated successfully');
                    })();
                    state.data = newData;
                }
                catch (err) {
                    console.log(err);
                    toast.error('An error occured while updating user');
                }
            }
        },
        setAvatarPath(state, action: PayloadAction<string>) {
            if (state.data?.avatarUrl) {
                state.data.avatarUrl = action.payload;
                const newData = { ...state.data };
                newData.avatarUrl = action.payload;
                (async () => {
                    await updateUserData(newData._id, newData);
                })();
            } else {
                toast.error('Failed to receive avatar');
            }
        },
        removeAvatar(state) {
            if (state.data?.avatarUrl) {
                const defaultAvatar = '/default-avatar.png'
                state.data.avatarUrl = defaultAvatar;

                const newData = { ...state.data };
                newData.avatarUrl = defaultAvatar;

                (async () => {
                    await updateUserData(newData._id, newData);
                })();
            }
        }
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

export const { updateUser, setAvatarPath, removeAvatar } = UserSlice.actions;

export default UserSlice.reducer;