
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "../features/cart/cartSlice";
import { selectCartItems, selectCartCount, selectCartTotal, selectIsCartEmpty } from "../features/cart/cartSelectors";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector, } from "../app/hooks";

import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

type UseCartReturn = {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartEmpty: boolean;
  addItem: (product: Product) => void;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearAllItems: () => void;
};

function useCart(): UseCartReturn {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const cartCount = useAppSelector(selectCartCount);
  const cartTotal = useAppSelector(selectCartTotal);
  const isCartEmpty = useAppSelector(selectIsCartEmpty);

  const addItem = useCallback((product: Product) => {
      dispatch(addToCart(product));
    },[dispatch]
  );

  const increaseItem = useCallback((id: number) => {
      dispatch(increaseQuantity(id));
    },[dispatch]
  );

  const decreaseItem = useCallback((id: number) => {
      dispatch(decreaseQuantity(id));
    },[dispatch]
  );

  const removeItem = useCallback((id: number) => {
      dispatch(removeFromCart(id));
    },[dispatch]
  );

  const clearAllItems = useCallback(() => {
    // if (window.confirm("Clear all items from cart?")) {
      dispatch(clearCart());
    // }
  }, [dispatch]);

  return {
    items,
    cartCount,
    cartTotal,
    isCartEmpty,
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
    clearAllItems,
  };
}

export default useCart;