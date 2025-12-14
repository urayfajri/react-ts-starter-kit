/**
 * Simple AuthGuard utilities
 * - `isAuthenticated` checks for a token in localStorage
 * - `getAuthToken` returns stored token
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("auth_token");
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export default { isAuthenticated, getAuthToken };
