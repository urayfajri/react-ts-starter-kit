import React from "react";
import { Button } from "@/shared/components/ui/button";
import Header from "@/shared/components/layout/Header";
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

  // Ensure data is an array
  const products = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center p-12">
            <div className="text-center space-y-3">
              <div className="inline-block">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center space-y-3">
            <p className="text-red-600 dark:text-red-400 font-semibold">
              Failed to load products
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        {/* Title Section */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Products Demo</h2>
          <p className="text-muted-foreground">
            Manage your products with React Query mutations
          </p>
        </div>

        {/* Add Product Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8 space-y-4">
          <h3 className="text-lg font-semibold">Add New Product</h3>
          <div className="flex gap-3">
            <input
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
              placeholder="Enter product name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && name.trim()) {
                  createMut.mutate({ name });
                  setName("");
                }
              }}
            />
            <Button
              onClick={() => {
                if (!name.trim()) return;
                createMut.mutate({ name });
                setName("");
              }}
              disabled={createMut.isPending}
            >
              {createMut.isPending ? "Saving..." : "Add Product"}
            </Button>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Product List ({products.length})</h3>
          {products.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-dashed border-primary/30">
              <p className="text-muted-foreground">
                No products yet. Add one to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between bg-card rounded-lg border border-input p-4 hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">📦</span>
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
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
                      className="bg-red-600 hover:bg-red-700"
                      size="sm"
                      onClick={() => deleteMut.mutate(p.id)}
                      disabled={deleteMut.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <a href="/">
            <Button variant="outline">← Back to Home</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
