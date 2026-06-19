import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import type { Product } from "../../types/product";

export const selectProducts = (state: RootState): Product[] => state.products.products;

export const selectSelectedProduct = (state: RootState): Product | null => state.products.selectedProduct;

export const selectProductsLoading = (state: RootState): boolean => state.products.loading;

export const selectProductsError = (state: RootState): string | null => state.products.error;

export const selectSearchTerm = (state: RootState): string => state.products.searchTerm;

export const selectSelectedCategory = (state: RootState): string => state.products.selectedCategory;

export const selectFilteredProducts = createSelector([selectProducts, selectSearchTerm, selectSelectedCategory],
  (products, searchTerm, selectedCategory): Product[] => {

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }
);

export const selectCategories = createSelector([selectProducts],
  (products): string[] => {
    const categories = products.map((product) => product.category);
    return ["all", ...new Set(categories)];
  }
);