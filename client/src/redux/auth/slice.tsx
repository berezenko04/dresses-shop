import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAuthMe, fetchUserData } from "./asyncActions";
import { Status } from "../products/types";
import { AuthSliceState, UserData } from "./types";

const initialState: AuthSliceState = {
    data: null,
    status: 'loading'
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING
        })

        builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchUserData.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
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

export default AuthSlice.reducer;