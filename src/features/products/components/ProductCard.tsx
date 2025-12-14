import type { Product } from "@/types/product";
import { Button } from "@/shared/components/ui/button";

export default function ProductCard({
  product,
  onUpdate,
  onDelete,
}: {
  product: Product;
  onUpdate?: (p: Product) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="bg-card rounded-lg border p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
          📦
        </div>
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">ID: {product.id}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onUpdate?.(product)}>
          Update
        </Button>
        <Button
          size="sm"
          className="bg-red-600 hover:bg-red-700"
          onClick={() => onDelete?.(product.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
