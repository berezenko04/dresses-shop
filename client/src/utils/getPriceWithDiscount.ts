export const getPriceWithDiscount = (price: number, discount: number) => {
    return Math.round(price - (price * discount));
}