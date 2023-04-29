import { createAsyncThunk } from "@reduxjs/toolkit";

import { getProducts, getProduct } from "../../API/dressesService";
import { FetchProducts } from "./types";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: FetchProducts) => {
        const { order = 'desc', sortBy = '_id', page = 1, limit = 12 } = params;
        const products = await getProducts(order, sortBy, page, limit);
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
