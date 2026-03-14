/**
 * Storage service - SSR-safe abstraction over localStorage/sessionStorage.
 * Use for persistence that doesn't belong in React state (e.g. tokens, preferences).
 * For component state that syncs to storage, prefer useLocalStorage hook.
 */

const isBrowser = () => typeof window !== "undefined";

export const storageService = {
  get<T>(key: string, storage: Storage = window.localStorage): T | null {
    if (!isBrowser()) return null;
    try {
      const item = storage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },

  set(key: string, value: unknown, storage: Storage = window.localStorage): void {
    if (!isBrowser()) return;
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`storageService.set("${key}") failed:`, e);
    }
  },

  remove(key: string, storage: Storage = window.localStorage): void {
    if (!isBrowser()) return;
    try {
      storage.removeItem(key);
    } catch {
      // no-op
    }
  },

  getString(key: string, storage: Storage = window.localStorage): string | null {
    if (!isBrowser()) return null;
    return storage.getItem(key);
  },

  setString(key: string, value: string, storage: Storage = window.localStorage): void {
    if (!isBrowser()) return;
    storage.setItem(key, value);
  },
} as const;

export const sessionStorageService = {
  get<T>(key: string): T | null {
    return isBrowser() ? storageService.get<T>(key, window.sessionStorage) : null;
  },
  set(key: string, value: unknown): void {
    storageService.set(key, value, window.sessionStorage);
  },
  remove(key: string): void {
    storageService.remove(key, window.sessionStorage);
  },
} as const;
