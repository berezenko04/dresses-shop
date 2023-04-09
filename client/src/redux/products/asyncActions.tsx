import { createAsyncThunk } from "@reduxjs/toolkit";

import { getProducts } from "../../API/dressesService";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const products = await getProducts();
        return products;
    }
)