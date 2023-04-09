export interface ProductSliceState {
    items: ProductItem[],
    status: 'loading' | 'success' | 'error'
}

export enum Status {
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success'
}

export type ProductItem = {
    id: number,
    _id: string,
    title: string,
    price: number,
    discount: number,
    imageUrl: string
}