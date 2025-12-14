import { api } from "@/shared/libs/api/axios";
import { API_CONFIG } from "@/config";
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "@/types/product";

export type { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get(API_CONFIG.ENDPOINTS.PRODUCTS);
  return res.data;
}

export async function createProduct(payload: CreateProductRequest): Promise<Product> {
  const res = await api.post(API_CONFIG.ENDPOINTS.PRODUCTS, payload);
  return res.data;
}

export async function updateProduct(payload: UpdateProductRequest): Promise<Product> {
  const res = await api.put(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL(payload.id), payload);
  return res.data;
}

export async function deleteProduct(id: string): Promise<{ id: string }> {
  const res = await api.delete(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL(id));
  return res.data;
}
