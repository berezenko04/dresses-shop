export interface ICartState {
    cartItems: TCartItem[],
    status: 'loading' | 'success' | 'error',
    totalPrice: number
}

export type TCartItem = {
    id: string,
    title: string,
    price: number,
    discount: number,
    size: string,
    quantity: number,
    imageUrl: string
}

export type TCartItemInfo = {
    id: string,
    size: string
}
