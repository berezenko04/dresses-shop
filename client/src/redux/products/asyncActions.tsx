import { createAsyncThunk } from "@reduxjs/toolkit";

import { getProducts } from "../../API/dressesService";
import { TFetchProducts } from "./types";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: TFetchProducts) => {
        const { order = 'desc', sortBy = '_id', page = 1, limit = 12, colors = '', sizes = '', priceRange = '' } = params;
        const products = await getProducts(order, sortBy, page, limit, colors, sizes, priceRange);
        return products;
    }
)
