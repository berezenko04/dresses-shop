import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Status } from "../products/types";
import { fetchCart } from "./asyncActions";
import { TCartItemInfo, ICartState, TCartItem } from "./types";
import { toast } from "react-toastify";
import { getTotalPrice } from "@/utils/getTotalPrice";


const initialState: ICartState = {
    cartItems: [],
    totalPrice: 0,
    status: Status.LOADING,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addInCart(state, action: PayloadAction<TCartItem>) {
            state.cartItems.push(action.payload);
            toast.success('Item added to cart');
            state.totalPrice = getTotalPrice(state.cartItems);
        },
        deleteFromCart(state, action: PayloadAction<TCartItemInfo>) {
            state.cartItems = state.cartItems.filter(obj => obj.id !== action.payload.id || obj.size !== action.payload.size);
            state.totalPrice = getTotalPrice(state.cartItems);
        },
        plusQuantity(state, action: PayloadAction<TCartItemInfo>) {
            const findItem = state.cartItems.find((obj) => (obj.id === action.payload.id) && (obj.size === action.payload.size));

            if (findItem) {
                findItem.quantity++;
            }
            state.totalPrice = getTotalPrice(state.cartItems);
        },
        minusQuantity(state, action: PayloadAction<TCartItemInfo>) {
            const findItem = state.cartItems.find((obj) => (obj.id === action.payload.id) && (obj.size === action.payload.size));

            if (findItem && findItem.quantity > 1) {
                findItem.quantity--;
            }
            state.totalPrice = getTotalPrice(state.cartItems);
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalPrice = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.cartItems = [];
            state.status = Status.LOADING
        })

        builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<TCartItem[]>) => {
            state.cartItems = action.payload;
            state.status = Status.SUCCESS;
            state.totalPrice = getTotalPrice(state.cartItems);
        })

        builder.addCase(fetchCart.rejected, (state) => {
            state.cartItems = [];
            state.status = Status.ERROR;
        })
    }
})

export const { addInCart, deleteFromCart, plusQuantity, minusQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;