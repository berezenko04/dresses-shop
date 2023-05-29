import axios from "@/axios";

type AddToCartProps = {
    item: {
        _id: string,
        title: string,
        price: number,
        imageUrl: string,
        discount: number,
        size: string,
        quantity: number
    },
    userId: string
}

export const getCart = async () => {
    const { data } = await axios.get(`/cart/get`);
    return data;
}

export const addToCart = async (item: AddToCartProps) => {
    const { data } = await axios.post('/cart/add', item);
    return data;
}

export const removeFromCart = async (itemId: string, size: string) => {
    await axios.delete(`/cart/delete?itemId=${itemId}&size=${size}`);
}
