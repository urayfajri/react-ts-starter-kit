import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/app/theme";

type ThemeToggleProps = {
  /** When true, only icon is shown (e.g. in collapsed sidebar) */
  iconOnly?: boolean;
};

export function ThemeToggle({ iconOnly = false }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  if (iconOnly) {
    return (
      <Button variant="ghost" size="icon" onClick={toggle} title={isDark ? "Light mode" : "Dark mode"}>
        {isDark ? "☀️" : "🌙"}
      </Button>
    );
  }
  return (
    <Button variant="outline" onClick={toggle}>
      {isDark ? "Light mode" : "Dark mode"}
    </Button>
  );
}
