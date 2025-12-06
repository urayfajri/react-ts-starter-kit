export interface CreateProductRequest {
  name: string;
}

export interface UpdateProductRequest {
  id: string;
  name: string;
}

export interface DeleteProductRequest {
  id: string;
}
