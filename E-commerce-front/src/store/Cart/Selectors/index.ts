import type { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const getCartTotalQuantitySelector = createSelector(
    (state: RootState) => state.Cart.items,
    (items) => {
      const totalQuantity = Object.values(items).reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue;
        },
        0
      );
      return totalQuantity;
    }
  );
  export { getCartTotalQuantitySelector };