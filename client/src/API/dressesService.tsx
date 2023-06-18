import axios from '@/axios'

//types
import { TProductItem, IProducts } from '@/redux/products/types';


const DEFAULT_URL = '/api/products';

export const getProducts = async (
    order: string,
    sortBy: string,
    page: number,
    limit: number,
    colors: string,
    sizes: string,
    priceRange: string
) => {
    const params = new URLSearchParams({
        sortBy,
        order,
        page: page.toString(),
        limit: limit.toString(),
        colors,
        sizes,
        priceRange
    });
    const { data } = await axios.get<IProducts>(`${DEFAULT_URL}?${params.toString()}`);
    return data;
}

export const getProduct = async (id: string) => {
    const { data } = await axios.get<TProductItem>(`${DEFAULT_URL}/${id}`);
    return data;
}

