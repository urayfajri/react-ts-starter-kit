import type { Product } from "./product";

export interface ProductResponse {
  data: Product;
  success: boolean;
  message?: string;
}

export interface ProductListResponse {
  data: Product[];
  success: boolean;
  total?: number;
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
