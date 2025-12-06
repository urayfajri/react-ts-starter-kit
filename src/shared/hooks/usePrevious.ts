import { useEffect, useState } from "react";

/**
 * usePrevious Hook
 * Stores the previous value of a variable
 *
 * @param value - Value to track
 * @returns Previous value
 *
 * Usage:
 * const count = 5;
 * const prevCount = usePrevious(count); // 4
 */
export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T>();

  useEffect(() => {
    setPrevious(value);
  }, [value]);

  return previous;
}
