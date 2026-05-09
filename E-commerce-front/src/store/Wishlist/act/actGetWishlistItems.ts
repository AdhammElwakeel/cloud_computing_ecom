import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetWishlistItems = createAsyncThunk(
  "wishlist/actGetWishlistItems",
  async (userId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`/wishlist?userId=${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export default actGetWishlistItems;