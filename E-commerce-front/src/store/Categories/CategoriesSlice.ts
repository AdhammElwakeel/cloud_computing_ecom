import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import type {Tloading} from "@/types/Shared";
import type {TCategory} from "@/types/Category";

interface ICategoriesState {
    record:TCategory[]
    loading: Tloading
    error: string | null
}

const initialState:ICategoriesState = {
    record: [],
    loading: "idle",
    error: null
};
const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {  
        builder
        .addCase(actGetCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        .addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.record = action.payload;
        })
        .addCase(actGetCategories.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        });
    }
});
export {actGetCategories}
export default CategoriesSlice.reducer;