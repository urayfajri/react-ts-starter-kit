import React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "./hooks";

export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts();
  const createMut = useCreateProduct();
  const updateMut = useUpdateProduct();
  const deleteMut = useDeleteProduct();

  const [name, setName] = React.useState("");

  if (isLoading) return <div className="p-6">Loading products...</div>;
  if (isError) return <div className="p-6">Failed to load products.</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold">Products Demo (Query + Mutations)</h2>

      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 bg-background"
          placeholder="New product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!name.trim()) return;
            createMut.mutate({ name });
            setName("");
          }}
          disabled={createMut.isPending}
        >
          {createMut.isPending ? "Saving..." : "Add"}
        </Button>
      </div>

      <ul className="space-y-2">
        {data?.map((p) => (
          <li key={p.id} className="flex items-center justify-between border rounded p-3">
            <span>{p.name}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateMut.mutate({ id: p.id, name: p.name + "!" })}
                disabled={updateMut.isPending}
              >
                Update
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteMut.mutate(p.id)}
                disabled={deleteMut.isPending}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <a className="underline text-sm" href="/">Back home</a>
    </div>
  );
}
