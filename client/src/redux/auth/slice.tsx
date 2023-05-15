import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAuthMe, fetchUserData } from "./asyncActions";
import { Status } from "../products/types";
import { AuthSliceState, UserData, TCartItem } from "./types";
import { addToCart, removeFromCart } from "@/API/userService";
import { toast } from "react-toastify";

const initialState: AuthSliceState = {
    data: null,
    status: 'loading',
    message: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addInCart(state, action: PayloadAction<TCartItem>) {
            const findItem = state.data?.cart.find((obj) => (obj._id === action.payload._id) && (obj.size === action.payload.size));

            if (!findItem) {
                toast.success('Item added to cart');
                state.data?.cart.push(action.payload);
                (async () => {
                    await addToCart({ item: action.payload, userId: state.data?._id || '' });
                })();
            } else {
                toast.error('Item already in cart');
            }
        },
        deleteFromCart(state, action: PayloadAction<string>) {
            if (state.data) {
                state.data.cart = state.data.cart?.filter((obj) => (obj._id !== action.payload));
                (async () => {
                    await removeFromCart(state.data?._id || '', action.payload);
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

export const { addInCart, deleteFromCart } = AuthSlice.actions;

export default AuthSlice.reducer;