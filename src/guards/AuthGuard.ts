import { AUTH_TOKEN_STORAGE_KEY } from "@/shared/constants/authStorage";

/**
 * Simple AuthGuard utilities
 * - `isAuthenticated` checks for a token in localStorage
 * - `getAuthToken` returns stored token
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export default { isAuthenticated, getAuthToken };
