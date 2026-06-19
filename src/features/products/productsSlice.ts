import getApiErrorMessage from "../../utils/getApiErrorMessage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI,fetchProductByIdAPI } from "./productsAPI";

import type { Product } from "../../types/product";

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  searchTerm: string;
  selectedCategory: string;
  loading: boolean;
  error: string | null;
};

export const fetchProducts = createAsyncThunk<Product[],void,{rejectValue: string;}>("products/fetchProducts",
   async (_, thunkAPI) => {
    try {
      const res = await fetchProductsAPI();
      return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(
          getApiErrorMessage(error, "Failed to fetch products")
        );
    }
  }
);

export const fetchProductById = createAsyncThunk<Product,string | number,{rejectValue: string;}>("products/fetchProductById",
   async (id, thunkAPI) => {
    try {
      const res = await fetchProductByIdAPI(id);
      return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(
          getApiErrorMessage(error, "Failed to fetch product")
        );
      }
    }
  );

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  searchTerm: localStorage.getItem("searchTerm") || "",
  selectedCategory: localStorage.getItem("selectedCategory") || "all",
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            localStorage.setItem("searchTerm",action.payload);
        },
        setSelectedCategory: (state, action) => {
          state.selectedCategory = action.payload;
          localStorage.setItem("selectedCategory",action.payload);
        },
        clearSelectedProduct: (state) => {
          state.selectedProduct = null;
        },
        clearFilters: (state) => {
          state.searchTerm = "";
          state.selectedCategory = "all";

          localStorage.removeItem("searchTerm");
          localStorage.removeItem("selectedCategory");
        },
    },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        // console.log(action.payload,'action.payload');
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
      });
  },
});

export const { setSearchTerm, setSelectedCategory, clearSelectedProduct, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;