import axios from '@/axios'

//types
import { ProductItem, Products } from '@/redux/products/types';

export const getProducts = async () => {
    const { data } = await axios.get<Products>('/api/products');
    return data;
}

export const getProduct = async (id: string) => {
    const { data } = await axios.get<ProductItem>(`/api/products/${id}`);
    return data;
}

