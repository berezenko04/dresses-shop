export interface IProductSliceState {
    items: TProductItem[],
    status: 'loading' | 'success' | 'error',
    length: number,
    maxPrice: number
}

export enum Status {
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success'
}

export interface IProducts {
    products: TProductItem[],
    length: number,
    maxPrice: number
}

export type TFetchProducts = {
    sortBy?: string,
    order?: string,
    page?: number,
    limit?: number,
    colors?: string,
    sizes?: string,
    priceRange?: string
}

export type TProductItem = {
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