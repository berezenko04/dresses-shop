import axios from '@/axios'

//types
import { TProductItem, IProducts } from '@/redux/products/types';
import { TComment, IComments } from '@/redux/comments/types';


const DEFAULT_LINK = '/api/products';

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
    const { data } = await axios.get<IProducts>(`${DEFAULT_LINK}?${params.toString()}`);
    return data;
}

export const getProduct = async (id: string) => {
    const { data } = await axios.get<TProductItem>(`${DEFAULT_LINK}/${id}`);
    return data;
}

export const getComments = async (id: string) => {
    const { data } = await axios.get<IComments>(`${DEFAULT_LINK}/${id}/comments`);
    return data;
}

export const addToComments = async (itemId: string, comment: TComment) => {
    const { data } = await axios.post(`${DEFAULT_LINK}/${itemId}/comments`, comment);
    return data;
}

