import axios from "@/axios"

//types
import { TLoginFormValues } from "@/components/Forms/LoginForm";
import { IUserData } from "@/redux/user/types";

const API_KEY = 'a29807b5b18547d2966ec2e2d9e2325d';
const DEFAULT_URL = '/user';

export const updateUserData = async (newData: Partial<IUserData>) => {
    const { data } = await axios.put(`${DEFAULT_URL}/update`, newData);
    return data;
}

export const getUserData = async (params: TLoginFormValues) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
}

export const getUser = async (userId: string) => {
    const { data } = await axios.get(`${DEFAULT_URL}/get?userId=${userId}`);
    return data;
}

export const getAuthMe = async () => {
    const { data } = await axios.get('/auth/me');
    return data;
}

export const getUserReviews = async (page: number, limit: number) => {
    const { data } = await axios.get(`${DEFAULT_URL}/comments?page=${page}&limit=${limit}`);
    return data;
}

export const uploadFile = async (formData: FormData) => {
    const { data } = await axios.post(`${DEFAULT_URL}/upload`, formData, {
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
