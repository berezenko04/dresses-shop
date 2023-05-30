import axios from '@/axios'

export const addToWishList = async (itemId: string) => {
    const data = await axios.post(`/wishlist/add?itemId=${itemId}`);
    return data;
}

export const removeFromWishList = async (itemId: string) => {
    await axios.delete(`/wishlist/delete?itemId=${itemId}`);
}