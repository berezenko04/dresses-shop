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

export type FetchProducts = {
    sortBy?: string,
    order?: string,
    page?: number,
    limit?: number
}

export type ProductItem = {
    _id: string,
    id: number,
    title: string,
    stock: boolean,
    desc: string,
    price: number,
    discount: number,
    images: string[],
    sizes: string[],
    colors: string[],
    rating: number,
}