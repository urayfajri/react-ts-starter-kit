import { useEffect, useState, useCallback } from "react";

/**
 * useAsync Hook
 * Manages async state (loading, error, data)
 *
 * @param asyncFunction - Async function to execute
 * @param immediate - Execute immediately on mount
 * @returns { data, loading, error }
 *
 * Usage:
 * const { data: products, loading, error } = useAsync(
 *   () => fetchProducts(),
 *   true
 * );
 */
export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // The execute function wraps asyncFunction and handles setting state
  const execute = useCallback(async () => {
    setStatus("pending");
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus("success");
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setStatus("error");
    }
  }, [asyncFunction]);

  // Call execute if we want to fire it immediately
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    execute,
    status,
    data,
    error,
    loading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
