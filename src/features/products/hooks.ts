import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  type Product,
} from "./api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to create product");
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Product updated");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to update product");
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["products"] });
      const prev = qc.getQueryData<Product[]>(["products"]);
      qc.setQueryData<Product[]>(["products"], (old) =>
        old?.filter((p) => p.id !== id)
      );
      return { prev };
    },

    onError: (err: any, _id, ctx) => {
      toast.error(err?.message ?? "Failed to delete product");
      if (ctx?.prev) qc.setQueryData(["products"], ctx.prev);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
