import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";

export default function HomePage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">React TS Starter Kit</h1>
        <ThemeToggle />
      </div>

      <p className="text-sm text-muted-foreground">
        StarterKit ready: shadcn + theme tokens + query/mutation.
      </p>

      <div className="space-x-2">
        <Button onClick={() => alert("gas!")}>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <a className="underline text-sm" href="/products">Go to Products demo</a>
    </div>
  );
}
