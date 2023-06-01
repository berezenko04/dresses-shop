import axios from "@/axios";

export const getCart = async () => {
    const { data } = await axios.get(`/cart/get`);
    return data;
}

export const addToCart = async (id: string, size: string) => {
    const { data } = await axios.post(`/cart/add?itemId=${id}&size=${size}`);
    return data;
}

export const removeFromCart = async (itemId: string, size: string) => {
    await axios.delete(`/cart/delete?itemId=${itemId}&size=${size}`);
}
