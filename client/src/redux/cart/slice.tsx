import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Status } from "../products/types";
import { fetchCart } from "./asyncActions";
import { CartItemInfo, CartState, TCartItem } from "./types";
import { addToCart, removeFromCart } from "@/API/cartService";
import { toast } from "react-toastify";
import { getTotalPrice } from "@/utils/getTotalPrice";


const initialState: CartState = {
    cartItems: [],
    totalPrice: 0,
    status: Status.LOADING
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addInCart(state, action: PayloadAction<TCartItem>) {
            const findItem = state.cartItems.find((obj) => (obj._id === action.payload._id) && (obj.size === action.payload.size));
            console.log(action.payload);
            if (!findItem) {
                toast.success('Item added to cart');
                (async () => {
                    await addToCart(action.payload);
                })();
                state.cartItems.push(action.payload);
                state.totalPrice = getTotalPrice(state.cartItems);
            } else {
                toast.error('Item already in cart');
            }
        },
        deleteFromCart(state, action: PayloadAction<CartItemInfo>) {
            try {
                (async () => {
                    await removeFromCart(action.payload._id, action.payload.size);
                })();
                state.cartItems = state.cartItems.filter(obj => obj._id !== action.payload._id || obj.size !== action.payload.size);
                state.totalPrice = getTotalPrice(state.cartItems);
            } catch (err) {
                console.log(err);
                toast.error('An error occurred while removing item');
            }
        },
        plusQuantity(state, action: PayloadAction<CartItemInfo>) {
            const findItem = state.cartItems.find((obj) => (obj._id === action.payload._id) && (obj.size === action.payload.size));

            if (findItem) {
                findItem.quantity++;
            }
            state.totalPrice = getTotalPrice(state.cartItems);
        },
        minusQuantity(state, action: PayloadAction<CartItemInfo>) {
            const findItem = state.cartItems.find((obj) => (obj._id === action.payload._id) && (obj.size === action.payload.size));

            if (findItem && findItem.quantity > 1) {
                findItem.quantity--;
            }
            state.totalPrice = getTotalPrice(state.cartItems);
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

export const { addInCart, deleteFromCart, plusQuantity, minusQuantity } = CartSlice.actions;

export default CartSlice.reducer;