import { useRef } from "react";

/**
 * useThrottle Hook
 * Throttles a function call
 *
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 *
 * Usage:
 * const throttledScroll = useThrottle(() => {
 *   handleScroll();
 * }, 100);
 *
 * useEffect(() => {
 *   window.addEventListener("scroll", throttledScroll);
 *   return () => window.removeEventListener("scroll", throttledScroll);
 * }, [throttledScroll]);
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastRun = useRef<number>(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(
        () => {
          callback(...args);
          lastRun.current = Date.now();
        },
        delay - (now - lastRun.current),
      );
    }
  };
}
