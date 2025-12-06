import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/app/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Button variant="outline" onClick={toggle}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
