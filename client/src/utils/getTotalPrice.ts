//types
import { TCartItem } from "@/redux/auth/types";

//utils
import { getPriceWithDiscount } from "./getPriceWithDiscount";

export const getTotalPrice = (cart: TCartItem[]) => {
    return cart.reduce((acc, item) => acc + getPriceWithDiscount(item.price, item.discount), 0);
}