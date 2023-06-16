import axios from '@/axios'

const DEFAULT_URL = '/wishlist';

export const addToWishList = async (itemId: string) => {
    const { data } = await axios.post(`${DEFAULT_URL}/add?itemId=${itemId}`);
    return data;
}

export const removeFromWishList = async (itemId: string) => {
    await axios.delete(`${DEFAULT_URL}/delete?itemId=${itemId}`);
}

export const getWishList = async () => {
    const { data } = await axios.get(`${DEFAULT_URL}/get`);
    return data;
}