import axios from "@/axios"

//types
import { LoginFormValues } from "@/components/LoginForm";
import { UpdatedUser } from "@/redux/user/types";

const API_KEY = 'a29807b5b18547d2966ec2e2d9e2325d';

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

export const getUserData = async (params: LoginFormValues) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
}

export const getUser = async (userId: string) => {
    const { data } = await axios.get(`/user/get?userId=${userId}`);
    return data;
}

export const getAuthMe = async () => {
    const { data } = await axios.get('/auth/me');
    return data;
}

export const addToWishList = async (userId: string, itemId: string) => {
    const data = await axios.post(`/wishlist/add?userId=${userId}&itemId=${itemId}`);
    return data;
}

export const removeFromWishList = async (userId: string, itemId: string) => {
    await axios.delete(`/wishlist/delete?userId=${userId}&itemId=${itemId}`);
}

export const getCart = async () => {
    const { data } = await axios.get('/cart/get');
    return data;
}

export const addToCart = async (item: AddToCartProps) => {
    const { data } = await axios.post('/cart/add', item);
    return data;
}

export const removeFromCart = async (userId: string, itemId: string) => {
    await axios.delete(`/cart/delete?userId=${userId}&itemId=${itemId}`);
}

export const getUserReviews = async () => {
    const { data } = await axios.get('/user/comments');
    return data;
}

export const updateUserData = async (userId: string, newData: UpdatedUser) => {
    const { data } = await axios.put(`/user/${userId}`, newData);
    return data;
}

export const uploadFile = async (formData: FormData) => {
    const { data } = await axios.post('/user/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}

export const getGeo = async () => {
    const { data } = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);
    return data;
}
