//types
import { TCartItem } from "@/redux/cart/types";

//utils
import { getPriceWithDiscount } from "./getPriceWithDiscount";

export const getTotalPrice = (items: TCartItem[]) => {
    return items.reduce((acc, item) => acc + getPriceWithDiscount(item.price, item.discount) * item.quantity, 0);
}