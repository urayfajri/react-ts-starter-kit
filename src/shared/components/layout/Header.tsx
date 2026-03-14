import { Link } from "react-router-dom";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/shared/contexts";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            React TS Starter
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link to="/app">
              <Button variant="outline" size="sm">Go to App</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
