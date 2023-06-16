import axios from '@/axios'

//types
import { TProductItem, IProducts } from '@/redux/products/types';
import { TComment, IComments } from '@/redux/comments/types';


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

export const getComments = async (id: string) => {
    const { data } = await axios.get<IComments>(`${DEFAULT_URL}/${id}/comments`);
    return data;
}

export const addToComments = async (itemId: string, comment: TComment) => {
    const { data } = await axios.post(`${DEFAULT_URL}/${itemId}/comments`, comment);
    return data;
}

