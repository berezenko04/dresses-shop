import axios from "@/axios"

const DEFAULT_URL = '/search';

export const getMatching = async (text: string) => {
    const { data } = await axios.post(`${DEFAULT_URL}/get?text=${text}`);
    return data;
}