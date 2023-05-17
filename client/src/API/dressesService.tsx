import axios from '@/axios'

//types
import { ProductItem, Products } from '@/redux/products/types';
import { Comments } from '@/redux/comments/types';

type Comment = {
    text: string,
    rating: number,
    user: string,
    date: string
}

const DEFAULT_LINK = '/api/products';

export const getProducts = async (order?: string, sortBy?: string, page?: number, limit?: number) => {
    const { data } = await axios.get<Products>(`${DEFAULT_LINK}?sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`);
    return data;
}

export const getProduct = async (id: string) => {
    const { data } = await axios.get<ProductItem>(`${DEFAULT_LINK}/${id}`);
    return data;
}

export const getComments = async (id: string) => {
    const { data } = await axios.get<Comments>(`${DEFAULT_LINK}/${id}/comments`);
    return data;
}

export const addToComments = async (itemId: string, comment: Comment) => {
    const { data } = await axios.post(`${DEFAULT_LINK}/${itemId}/comments`, comment);
    return data;
}

