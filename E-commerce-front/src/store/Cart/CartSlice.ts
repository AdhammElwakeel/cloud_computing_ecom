import type { TProduct } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductByItems from "./act/actGetProductByItems";

interface ICartState {
  items: { [key: number]: number };
  ProductFullinfo: TProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  ProductFullinfo: [],
  loading: false,
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, max } = action.payload;
      const currentQuantity = state.items[id] || 0;
      if (currentQuantity < max) {
        if (state.items[id]) {
          state.items[id] += 1;
        } else {
          state.items[id] = 1;
        }
      }
    },
    removefromCart: (state, action) => {
      const { id } = action.payload;
      if (state.items[id] > 1) {
        state.items[id] -= 1;
      } else {
        delete state.items[id];
        state.ProductFullinfo = state.ProductFullinfo.filter(
          (product) => product.id !== id
        );
      }
    },
    deleteItemCompletely: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
      state.ProductFullinfo = state.ProductFullinfo.filter(
        (product) => product.id !== id
      );
    },
    clearCart: (state) => {
      state.items = {};
      state.ProductFullinfo = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProductByItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetProductByItems.fulfilled, (state, action) => {
        state.loading = false;
        state.ProductFullinfo = action.payload;
      })
      .addCase(actGetProductByItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { addToCart , removefromCart, deleteItemCompletely, clearCart } = CartSlice.actions;
export { actGetProductByItems }; 
export default CartSlice.reducer;