import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  fetchProducts,
  setSearchTerm,
  setSelectedCategory,
  clearFilters,
} from "../features/products/productsSlice";

import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectSearchTerm,
  selectSelectedCategory,
  selectCategories,
  selectFilteredProducts,
} from "../features/products/productsSelectors";

import type { Product } from "../types/product";

type UseProductsReturn = {
  allProducts: Product[];
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  updateSearch: (value: string) => void;
  updateCategory: (value: string) => void;
  resetFilters: () => void;
};

function useProducts(): UseProductsReturn {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts = useAppSelector(selectProducts);
  const products = useAppSelector(selectFilteredProducts);

  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "all";

    dispatch(setSearchTerm(urlSearch));
    dispatch(setSelectedCategory(urlCategory));
  }, [dispatch, searchParams]);

  const updateUrlParams = useCallback((search: string, category: string) => {
      const params: Record<string, string> = {};
      if (search) {
        params.search = search;
      }
      if (category && category !== "all") {
        params.category = category;
      }
      setSearchParams(params);
    },[setSearchParams]
  );

  const updateSearch = useCallback((value: string) => {
      dispatch(setSearchTerm(value));
      updateUrlParams(value, selectedCategory);
    },
    [dispatch, selectedCategory, updateUrlParams]
  );

  const updateCategory = useCallback((value: string) => {
      dispatch(setSelectedCategory(value));
      updateUrlParams(searchTerm, value);
    },
    [dispatch, searchTerm, updateUrlParams]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
    setSearchParams({});
  }, [dispatch, setSearchParams]);

  return {
    allProducts,
    products,
    loading,
    error,
    searchTerm,
    selectedCategory,
    categories,
    updateSearch,
    updateCategory,
    resetFilters,
  };
}
export default useProducts;