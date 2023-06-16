import axios from "@/axios";

const DEFAULT_URL = '/cart';

export const getCart = async () => {
    const { data } = await axios.get(`${DEFAULT_URL}/get`);
    return data;
}

export const addToCart = async (id: string, size: string) => {
    const { data } = await axios.post(`${DEFAULT_URL}/add?itemId=${id}&size=${size}`);
    return data;
}

export const removeFromCart = async (itemId: string, size: string) => {
    await axios.delete(`${DEFAULT_URL}/delete?itemId=${itemId}&size=${size}`);
}

export const clearCart = async () => {
    await axios.delete(`${DEFAULT_URL}/clear`);
}
