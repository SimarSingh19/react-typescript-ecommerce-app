import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { CartItem } from "../../types/cart";

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

// export const selectIsCartEmpty = (state: RootState): boolean => state.cart.items.length === 0;

export const selectIsCartEmpty = createSelector([selectCartItems],(items) => items.length === 0);

// export const selectCartCount = (state: RootState): number =>
//   state.cart.items.reduce((total, item) => total + item.quantity, 0
// );

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

// export const selectCartTotal = (state: RootState): number =>
//   state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0
// );

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);