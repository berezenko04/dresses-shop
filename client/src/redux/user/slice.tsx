import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAuthMe, fetchUserData, uploadAvatar } from "./asyncActions";
import { Status } from "../products/types";
import { UserSliceState, UserData, TCartItem, RemoveFromCart, UpdatedUser, Avatar } from "./types";
import { addToCart, removeFromCart, updateUserData, uploadFile } from "@/API/userService";
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
        deleteFromCart(state, action: PayloadAction<RemoveFromCart>) {
            if (state.data) {
                try {
                    if (state.data?._id) {
                        (async () => {
                            await removeFromCart(state.data?._id || '', action.payload._id);
                        })();
                        state.data.cart = state.data.cart?.filter((obj) => (obj._id !== action.payload._id) && (obj.size !== action.payload.size));
                    } else {
                        toast.error('Failed to receive user');
                    }
                } catch (err) {
                    console.log(err);
                    toast.error('An error occured while removing item');
                }
            } else {
                toast.error('An error occured while removing item');
            }
        },
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
                        if (state.data?._id) {
                            await updateUserData(state.data?._id, newData);
                            toast.success('Data updated successfully');
                        } else {
                            toast.error('Failed to receive user');
                        }
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
        removeAvatar(state, action) {
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

export const { addInCart, deleteFromCart, updateUser, setAvatarPath, removeAvatar } = UserSlice.actions;

export default UserSlice.reducer;