import axios from "@/axios";

import { TComment, IComments } from '@/redux/comments/types';

const DEFAULT_URL = '/reviews';

export const getComments = async (id: string) => {
    const { data } = await axios.get<IComments>(`${DEFAULT_URL}/get/${id}`);
    return data;
}

export const addToComments = async (itemId: string, comment: TComment) => {
    const { data } = await axios.post(`${DEFAULT_URL}/post/${itemId}`, comment);
    return data;
}

export const likeReview = async (id: string) => {
    const { data } = await axios.post(`${DEFAULT_URL}/like/${id}`);
    return data;
}

export const dislikeReview = async (id: string) => {
    const { data } = await axios.post(`${DEFAULT_URL}/dislike/${id}`);
    return data;
}