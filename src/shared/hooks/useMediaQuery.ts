import { useEffect, useState } from "react";

/**
 * useMediaQuery Hook
 * Detects if a media query matches
 *
 * @param query - Media query string
 * @returns Boolean indicating if query matches
 *
 * Usage:
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDark = useMediaQuery("(prefers-color-scheme: dark)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create listener
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
