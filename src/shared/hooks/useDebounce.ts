import { useEffect, useRef } from "react";

/**
 * useDebounce Hook
 * Debounces a function call
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * Usage:
 * const debouncedSearch = useDebounce((query) => {
 *   handleSearch(query);
 * }, 300);
 *
 * useEffect(() => {
 *   debouncedSearch(searchQuery);
 * }, [searchQuery, debouncedSearch]);
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
