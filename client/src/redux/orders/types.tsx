import { TCartItem } from "../cart/types";
import { Status } from "../products/types";


export interface IOrdersState {
    status: Status.LOADING | Status.ERROR | Status.SUCCESS,
    length: number,
    orders: TOrderItem[]
}

export type TOrderItem = {
    orderId?: number,
    date: string,
    status?: string,
    subTotal: number,
    shippingMethod?: string,
    shipmentCost?: number,
    shippingAddress?: string,
    paymentMethod: string,
    trackingNumber?: string,
    discount: number,
    products: TCartItem[]
}

export interface IMakeOrder {
    orderItem: TOrderItem,
    length: number
}

export interface IFetchOrders {
    items: TOrderItem[],
    length: number
}