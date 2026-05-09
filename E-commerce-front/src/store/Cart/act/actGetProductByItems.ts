import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import axios from "axios";
import type { TProduct } from "@/types/Product";

const actGetProductByItems = createAsyncThunk(
    "cart/actGetProductByItems",
    async (_, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
        const { Cart } = getState() as RootState;
        const itemids = Object.keys(Cart.items);

        if (itemids.length === 0) {
            return fulfillWithValue([]);
        }
        const concatenatedIds = itemids.map((el) => `id=${el}`).join("&");
        
        try {
            const response = await axios.get<TProduct[]>(
                `/products?${concatenatedIds}`
            );
            return response.data;
          
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || error.message);
            }
            return rejectWithValue("An unexpected error occurred");
        }
        
    }
);

export default actGetProductByItems;