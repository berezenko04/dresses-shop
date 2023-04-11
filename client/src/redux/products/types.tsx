export interface ProductSliceState {
    items: ProductItem[],
    status: 'loading' | 'success' | 'error',
    length: number
}

export enum Status {
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success'
}

export interface Products {
    products: ProductItem[],
    length: number
}

export type ProductItem = {
    _id: string,
    id: number,
    title: string,
    stock: boolean,
    price: number,
    discount: number,
    imageUrl: string,
    sizes: string[],
    rating: number,
}