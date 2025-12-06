import { api } from "@/shared/libs/api/axios";

export type Product = { id: string; name: string };

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  return res.data;
}

export async function createProduct(payload: { name: string }): Promise<Product> {
  const res = await api.post("/products", payload);
  return res.data;
}

export async function updateProduct(payload: { id: string; name: string }): Promise<Product> {
  const res = await api.put(`/products/${payload.id}`, payload);
  return res.data;
}

export async function deleteProduct(id: string): Promise<{ id: string }> {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}
