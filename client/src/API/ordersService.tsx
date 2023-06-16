import { TOrderItem } from "@/redux/orders/types";
import axios from "@/axios";

const DEFAULT_URL = '/orders'

export const postOrder = async (params: TOrderItem) => {
    const { data } = await axios.post(`${DEFAULT_URL}/make-order`, params);
    return data;
}

export const getOrders = async () => {
    const { data } = await axios.get(`${DEFAULT_URL}/get`);
    return data;
}

export const exportCSV = async () => {
    return await axios.get(`${DEFAULT_URL}/exportCSV`, {
        responseType: 'blob'
    });
}