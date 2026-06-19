import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../../types/product";
import type { CartItem } from "../../types/cart";

type CartState = {
  items: CartItem[];
};

const getSavedCartItems = (): CartItem[] => {
  try {
    const savedItems = localStorage.getItem("cartItems");

    return savedItems ? (JSON.parse(savedItems) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: getSavedCartItems(),
};


const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem ) {
        if (existingItem.quantity < existingItem.stock) {
            existingItem.quantity += 1;
          }
      } else {
        state.items.push({...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      saveCartToLocalStorage(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
        saveCartToLocalStorage(state.items);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;