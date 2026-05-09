import { createSlice } from "@reduxjs/toolkit";
import type { Tloading } from "@/types/Shared";
import type { TProduct } from "@/types/Product";
import actGetProductsByCatPrefix from "./act/actGetProducts"; 

interface IProductsState {
    records: TProduct[]
    loading: Tloading
    error: string | null
}

const initialState: IProductsState = {
    records: [],
    loading: "idle",
    error: null
};

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsCleanUp: (state) => {
            state.records = [];
        },
    },
    extraReducers: (builder) => {  
        builder
        .addCase(actGetProductsByCatPrefix.pending, (state) => { 
            state.loading = "pending";
            state.error = null;
        })
        .addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => { 
            state.loading = "succeeded";
            state.records = action.payload;
        })
        .addCase(actGetProductsByCatPrefix.rejected, (state, action) => { 
            state.loading = "failed";
            state.error = action.payload as string;
        });
    }
});

export { actGetProductsByCatPrefix }; 
export const { productsCleanUp } = ProductsSlice.actions;
export default ProductsSlice.reducer;