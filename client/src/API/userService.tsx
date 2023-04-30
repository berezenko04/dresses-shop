import axios from "@/axios"

//types
import { LoginFormValues } from "@/components/LoginForm";

export const getUserData = async (params: LoginFormValues) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
}

export const getAuthMe = async () => {
    const { data } = await axios.get('/auth/me');
    return data;
}

export const addToWishList = async (userId: string, itemId: string) => {
    await axios.post(`/wishlist/add?userId=${userId}&itemId=${itemId}`);
}