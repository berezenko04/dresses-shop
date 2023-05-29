export interface CartState {
    cartItems: TCartItem[],
    status: 'loading' | 'success' | 'error',
    totalPrice: number
}

export type TCartItem = {
    _id: string,
    title: string,
    price: number,
    discount: number,
    size: string,
    quantity: number,
    imageUrl: string
}

export type CartItemInfo = {
    _id: string,
    size: string
}

export type AddToCart = {
    item: TCartItem,
    userId: string
}