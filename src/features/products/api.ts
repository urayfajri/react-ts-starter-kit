import { api } from "@/shared/libs/api/axios";
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "@/types/product";

export type { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  return res.data;
}

export async function createProduct(payload: CreateProductRequest): Promise<Product> {
  const res = await api.post("/products", payload);
  return res.data;
}

export async function updateProduct(payload: UpdateProductRequest): Promise<Product> {
  const res = await api.put(`/products/${payload.id}`, payload);
  return res.data;
}

export async function deleteProduct(id: string): Promise<{ id: string }> {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}
