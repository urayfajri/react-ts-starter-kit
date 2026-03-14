import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";
import { useAuth } from "@/shared/contexts";
import { useUiStore } from "@/shared/stores";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { to: "/app", label: "Dashboard", icon: "📊" },
  { to: "/app/products", label: "Products", icon: "📦" },
] as const;

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUiStore();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-card transition-[width] duration-200 ease-in-out",
        sidebarOpen ? "w-56" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-3 gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shrink-0">
          <span className="text-white font-bold">⚡</span>
        </div>
        {sidebarOpen && (
          <span className="font-semibold text-sm truncate bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Starter
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              location.pathname === to
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <span className="text-lg shrink-0 w-6 text-center">{icon}</span>
            {sidebarOpen && <span className="truncate">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Expand / Collapse */}
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          size={sidebarOpen ? "default" : "icon"}
          className="w-full justify-start"
          onClick={toggleSidebar}
        >
          <span className="shrink-0">{sidebarOpen ? "◀" : "▶"}</span>
          {sidebarOpen && <span className="ml-2">Collapse</span>}
        </Button>
      </div>

      {/* Theme (light/dark) - always visible */}
      <div className={cn("p-2 border-t", !sidebarOpen && "flex justify-center")}>
        {sidebarOpen ? <ThemeToggle /> : <ThemeToggle iconOnly />}
      </div>

      {/* User + Logout */}
      <div className="p-2 border-t">
        {sidebarOpen ? (
          <div className="px-3 py-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground truncate">Logged in as</p>
            <p className="text-sm font-medium truncate">{user?.name ?? "User"}</p>
            <Button variant="ghost" size="sm" className="w-full mt-2" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="w-full" onClick={handleLogout} title="Log out">
            🚪
          </Button>
        )}
      </div>
    </aside>
  );
}
