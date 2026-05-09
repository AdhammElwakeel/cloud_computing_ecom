import { createSlice } from '@reduxjs/toolkit';
import actLikeToggle from './act/actLikeToggle';
import actGetWishlistItems from './act/actGetWishlistItems';

interface Iwishlist {
    itemsId: number[];
    loading: boolean;
    error: string | null;
}

const initialState: Iwishlist = {
    itemsId: [],
    loading: false,
    error: null
};

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.itemsId = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actLikeToggle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(actLikeToggle.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.type === "add") {
                    state.itemsId.push(action.payload.id);
                } else {
                    state.itemsId = state.itemsId.filter(id => id !== action.payload.id);
                }
            })
            .addCase(actLikeToggle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(actGetWishlistItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(actGetWishlistItems.fulfilled, (state, action) => {
                state.loading = false;
                state.itemsId = action.payload.map((item: { productId: number }) => item.productId);
            })
            .addCase(actGetWishlistItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearWishlist } = wishListSlice.actions;
export { actGetWishlistItems };
export default wishListSlice.reducer;