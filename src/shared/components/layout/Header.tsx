import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            React TS Starter
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
