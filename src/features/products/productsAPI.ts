import api from "../../services/api";
import type { Product, ProductsResponse } from "../../types/product";

export const fetchProductsAPI = async (): Promise<Product[]> => {
  const res = await api.get<ProductsResponse>("/products");
  return res.data.products;
};

export const fetchProductByIdAPI = async (id: string | number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};