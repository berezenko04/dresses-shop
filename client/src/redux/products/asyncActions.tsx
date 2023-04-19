import { createAsyncThunk } from "@reduxjs/toolkit";

import { getProducts, getProduct } from "../../API/dressesService";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const products = await getProducts();
        return products;
    }
)

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (id: string) => {
        const product = await getProduct(id);
        return product;
    }
)
