# Config & Hooks Integration Guide

Panduan lengkap untuk menggunakan Config Folder dan Shared Hooks yang telah diimplementasikan di Phase 1.

## Overview

Phase 1 memperkenalkan dua peningkatan arsitektur utama:

1. **Config Folder** - Centralized configuration untuk API, app settings, dan global constants
2. **Shared Hooks** - Reusable custom hooks untuk common patterns (localStorage, debounce, throttle, async operations, previous value tracking, media queries)

Dokumentasi ini mencakup cara menggunakan dan mengintegrasikan keduanya ke dalam aplikasi.

---

## 🎯 Config Folder

### Files Structure

```
src/config/
├── api.ts           # API configuration, endpoints, retry config, cache settings
├── app.ts           # App-wide settings, features, validation rules, pagination
├── constants.ts     # Global constants (HTTP status, messages, delays, durations)
└── index.ts         # Barrel export
```

### 1. `src/config/api.ts` - API Configuration

Centralized API configuration dengan endpoints, retry logic, dan cache settings.

**Features:**

- Base URL configuration dengan environment variables
- Dynamic endpoints untuk common patterns
- Retry configuration (attempts, delay, backoff)
- Cache durations per endpoint
- Timeout configuration

**Usage:**

```typescript
import { API_CONFIG } from "@/config";

// Access base URL
console.log(API_CONFIG.BASE_URL); // "http://localhost:3000/api"

// Access endpoints
console.log(API_CONFIG.ENDPOINTS.PRODUCTS); // "/products"
console.log(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL("1")); // "/products/1"

// Use retry config
if (retries < API_CONFIG.RETRY.MAX_ATTEMPTS) {
  // Retry with exponential backoff
  const delay = API_CONFIG.RETRY.DELAY * Math.pow(API_CONFIG.RETRY.BACKOFF, retries);
  await sleep(delay);
}

// Use cache config
queryClient.setQueryDefaults(["products"], {
  staleTime: API_CONFIG.CACHE.PRODUCTS, // 5 minutes
});
```

**Configuration Values:**

```typescript
export const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api",
  TIMEOUT: 30000,

  ENDPOINTS: {
    PRODUCTS: "/products",
    PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  },

  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 1 second
    BACKOFF: 1.5, // Exponential backoff multiplier
  },

  CACHE: {
    PRODUCTS: 5 * 60 * 1000, // 5 minutes
    USERS: 10 * 60 * 1000, // 10 minutes
  },
};
```

### 2. `src/config/app.ts` - App Configuration

Application-wide settings, features, pagination, dan validation rules.

**Features:**

- App metadata (name, version, description)
- Environment detection (dev, prod, staging)
- Feature flags untuk enable/disable features
- Pagination defaults
- Validation regex patterns

**Usage:**

```typescript
import { APP_CONFIG } from "@/config";

// Check environment
if (APP_CONFIG.IS_DEV) {
  console.log("Running in development mode");
}

// Check feature flags
if (APP_CONFIG.FEATURES.DARK_MODE) {
  // Dark mode is enabled
}

// Pagination defaults
const pageSize = APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE; // 20
const pageSizeOptions = APP_CONFIG.PAGINATION.PAGE_SIZE_OPTIONS;

// Validation
const emailRegex = APP_CONFIG.VALIDATION.EMAIL_REGEX;
if (emailRegex.test(email)) {
  // Valid email
}
```

**Configuration Values:**

```typescript
export const APP_CONFIG = {
  NAME: "React TS Starter Kit",
  VERSION: "1.0.0",
  DESCRIPTION: "Modern React starter with TypeScript",

  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  FEATURES: {
    DARK_MODE: true,
    AUTH: false,
    NOTIFICATIONS: true,
  },

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100] as const,
  },

  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};
```

### 3. `src/config/constants.ts` - Global Constants

App-wide constants dan magic strings elimination.

**Features:**

- HTTP status codes
- Error messages
- Success messages
- Debounce/throttle delays
- Animation durations

**Usage:**

```typescript
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DELAYS,
  DURATIONS,
} from "@/config/constants";

// HTTP status checking
if (response.status === HTTP_STATUS.NOT_FOUND) {
  showError(ERROR_MESSAGES.NOT_FOUND);
}

// Success messages
showSuccess(SUCCESS_MESSAGES.CREATED);

// Debounce/throttle delays
const debouncedSearch = debounce(handleSearch, DELAYS.DEBOUNCE_SEARCH);

// Animation durations
setTimeout(() => {
  // Animation complete
}, DURATIONS.FADE);
```

**Configuration Values:**

```typescript
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const ERROR_MESSAGES = {
  NETWORK: "Network error. Please check your connection.",
  SERVER: "Server error. Please try again later.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION: "Please check your input and try again.",
  UNKNOWN: "An unexpected error occurred.",
};

export const SUCCESS_MESSAGES = {
  CREATED: "Created successfully.",
  UPDATED: "Updated successfully.",
  DELETED: "Deleted successfully.",
  SAVED: "Saved successfully.",
};

export const DELAYS = {
  DEBOUNCE_SEARCH: 300,
  DEBOUNCE_RESIZE: 250,
  THROTTLE_SCROLL: 100,
};

export const DURATIONS = {
  FADE: 200,
  SLIDE: 300,
  MODAL: 400,
};
```

---

## 🎯 Shared Hooks

### Files Structure

```
src/shared/hooks/
├── useLocalStorage.ts      # localStorage state synchronization
├── useDebounce.ts          # Debounce function calls
├── useThrottle.ts          # Throttle function calls
├── useAsync.ts             # Async operation state management
├── usePrevious.ts          # Track previous value
├── useMediaQuery.ts        # Media query detection
└── index.ts                # Barrel export
```

### 1. `useLocalStorage` - localStorage State Sync

Synchronize React state dengan browser localStorage.

**Features:**

- Type-safe with TypeScript generics
- SSR-safe (checks for window object)
- Error handling dengan fallback
- Supports function argument like useState

**Usage:**

```typescript
import { useLocalStorage } from "@/shared/hooks";

export function ThemeToggle() {
  // Specify initial value and localStorage key
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "theme-preference",
    "light"
  );

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
}

// Function argument support (like useState)
const [count, setCount] = useLocalStorage("count", 0);
setCount(prev => prev + 1);  // ✅ Works with function argument

// Persists to localStorage
// localStorage.getItem("theme-preference") => "dark"
```

**Signature:**

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void];
```

### 2. `useDebounce` - Debounce Function Calls

Debounce function calls untuk prevent excessive executions (search, input, resize).

**Features:**

- Generic callback type support
- Configurable delay in milliseconds
- Memory leak prevention with cleanup

**Usage:**

```typescript
import { useDebounce } from "@/shared/hooks";
import { DELAYS } from "@/config/constants";

export function ProductSearch() {
  const [results, setResults] = useState([]);

  // Create debounced search function
  const debouncedSearch = useDebounce(
    async (query: string) => {
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      }
    },
    DELAYS.DEBOUNCE_SEARCH  // 300ms
  );

  return (
    <input
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search products..."
    />
  );
}
```

**Use Cases:**

- Search input debouncing
- Window resize handlers
- Form validation debouncing
- API calls on user input

**Signature:**

```typescript
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void;
```

### 3. `useThrottle` - Throttle Function Calls

Throttle function calls untuk ensure function runs at most once per delay (scroll, resize events).

**Features:**

- Generic callback type support
- Configurable throttle interval
- Immediate execution with delayed backup
- Memory leak prevention

**Usage:**

```typescript
import { useThrottle } from "@/shared/hooks";
import { DELAYS } from "@/config/constants";

export function ScrollListener() {
  const throttledScroll = useThrottle(
    () => {
      console.log("Scroll event:", window.scrollY);
      // Update UI based on scroll position
    },
    DELAYS.THROTTLE_SCROLL  // 100ms
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [throttledScroll]);

  return <div>Scroll me</div>;
}
```

**Use Cases:**

- Scroll event handlers
- Window resize handlers
- Rapid button clicks
- High-frequency DOM updates

**Signature:**

```typescript
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void;
```

### 4. `useAsync` - Async Operation State

Manage async operation state (loading, error, data, status).

**Features:**

- Complete state management (idle, pending, success, error)
- Execute function for manual triggering
- Optional immediate execution
- Type-safe with TypeScript generics

**Usage:**

```typescript
import { useAsync } from "@/shared/hooks";

export function ProductList() {
  const {
    execute,
    status,
    data,
    error,
    loading,
    isSuccess,
    isError
  } = useAsync(
    async () => {
      const response = await api.get("/products");
      return response.data;
    },
    { immediate: true }  // Execute immediately on mount
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <ul>
      {data.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Manual execution
async function handleRefresh() {
  await execute();  // Re-run the async operation
}
```

**Status Values:**

- `"idle"` - Not started
- `"pending"` - In progress
- `"success"` - Completed successfully
- `"error"` - Error occurred

**Signature:**

```typescript
interface UseAsyncOptions {
  immediate?: boolean; // Execute immediately on mount
}

interface UseAsyncResult<T> {
  execute: () => Promise<void>;
  status: "idle" | "pending" | "success" | "error";
  data: T | null;
  error: Error | null;
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

function useAsync<T>(
  callback: () => Promise<T>,
  options?: UseAsyncOptions,
): UseAsyncResult<T>;
```

### 5. `usePrevious` - Track Previous Value

Track the previous value of a variable across renders.

**Features:**

- Returns undefined initially
- Updates after each render
- Type-safe with TypeScript generics

**Usage:**

```typescript
import { usePrevious } from "@/shared/hooks";

export function ProductForm() {
  const [productId, setProductId] = useState<string | null>(null);
  const previousId = usePrevious(productId);

  useEffect(() => {
    if (previousId !== productId && productId) {
      console.log(`Product changed from ${previousId} to ${productId}`);
      // Handle product change
    }
  }, [productId, previousId]);

  return (
    <div>
      Current: {productId} | Previous: {previousId}
    </div>
  );
}
```

**Use Cases:**

- Detect value changes
- Track state transitions
- Compare current vs previous props
- Implement undo/redo logic

**Signature:**

```typescript
function usePrevious<T>(value: T): T | undefined;
```

### 6. `useMediaQuery` - Media Query Detection

Detect media query matches for responsive design without CSS-in-JS.

**Features:**

- CSS media query syntax support
- Returns boolean matching state
- Listener management for updates
- SSR-safe

**Usage:**

```typescript
import { useMediaQuery } from "@/shared/hooks";

export function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}

      {isDarkMode && <DarkModeStyles />}

      {isLandscape ? (
        <LandscapeContent />
      ) : (
        <PortraitContent />
      )}
    </div>
  );
}

// Common media queries
const screens = {
  isMobile: useMediaQuery("(max-width: 640px)"),
  isTablet: useMediaQuery("(min-width: 641px) and (max-width: 1024px)"),
  isDesktop: useMediaQuery("(min-width: 1025px)"),
  isRetina: useMediaQuery("(min-resolution: 192dpi)"),
};
```

**Signature:**

```typescript
function useMediaQuery(query: string): boolean;
```

### 7. Barrel Export - `index.ts`

```typescript
export { useLocalStorage } from "./useLocalStorage";
export { useDebounce } from "./useDebounce";
export { useThrottle } from "./useThrottle";
export { useAsync } from "./useAsync";
export { usePrevious } from "./usePrevious";
export { useMediaQuery } from "./useMediaQuery";
```

**Usage:**

```typescript
// Import individual hook
import { useLocalStorage } from "@/shared/hooks";

// Or import multiple
import { useLocalStorage, useDebounce, useThrottle } from "@/shared/hooks";
```

---

## 📋 Integration Checklist

### Phase 1 ✅ Complete

#### Config Integration

- [ ] Update `src/shared/libs/api/axios.ts` to use `API_CONFIG.BASE_URL`
- [ ] Update `src/shared/libs/api/axios.ts` timeout to use `API_CONFIG.TIMEOUT`
- [ ] Update `src/features/products/api.ts` to use `API_CONFIG.ENDPOINTS.PRODUCTS`
- [ ] Verify all API calls work with new config references
- [ ] Run `npm run type-check` - should pass
- [ ] Run `npm run lint` - should pass

#### Hooks Integration

- [ ] Add `useLocalStorage` to `src/shared/components/layout/ThemeToggle.tsx` for persistent theme
- [ ] Add `useDebounce` to product search (if exists) or create SearchComponent
- [ ] Add `useMediaQuery` to responsive components
- [ ] Add `useAsync` to fallback for simple async operations
- [ ] Test hooks don't conflict with React Query
- [ ] Run `npm run build` - should succeed

#### Verification

- [ ] `npm run dev` - app starts without errors
- [ ] All pages load correctly
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Git status shows modified files

### Phase 2 ⏳ Planned

- Guards folder (ProtectedRoute, AuthGuard)
- Error handling layer (AppError, ErrorBoundary)
- Feature components structure
- Feature stores (Zustand)

---

## 🚀 Common Integration Patterns

### Pattern 1: Theme Persistence

```typescript
// src/shared/components/layout/ThemeToggle.tsx
import { useLocalStorage } from "@/shared/hooks";

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "theme",
    "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

### Pattern 2: Debounced Search

```typescript
// src/features/products/components/ProductSearch.tsx
import { useDebounce } from "@/shared/hooks";
import { PRODUCT_TIMEOUTS } from "../constants";

export function ProductSearch() {
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce(
    async (query: string) => {
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed");
      }
    },
    PRODUCT_TIMEOUTS.DEBOUNCE_SEARCH
  );

  return (
    <input
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search products..."
    />
  );
}
```

### Pattern 3: Responsive Layout

```typescript
// src/shared/components/layout/Dashboard.tsx
import { useMediaQuery } from "@/shared/hooks";

export function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={isMobile ? "flex flex-col" : "grid grid-cols-3"}>
      {/* Layout changes based on screen size */}
    </div>
  );
}
```

### Pattern 4: Simple Async Operations

```typescript
// src/features/products/hooks.ts
import { useAsync } from "@/shared/hooks";

export function useProducts() {
  const { data, loading, error, isSuccess } = useAsync(
    async () => {
      const response = await api.get("/products");
      return response.data;
    },
    { immediate: true },
  );

  return { products: data, loading, error, isSuccess };
}
```

### Pattern 5: Track Value Changes

```typescript
// src/features/products/page.tsx
import { usePrevious } from "@/shared/hooks";

export function ProductDetail({ productId }: { productId: string }) {
  const previousId = usePrevious(productId);

  useEffect(() => {
    if (previousId !== productId) {
      // Fetch new product data
      loadProduct(productId);
    }
  }, [productId, previousId]);

  return <div>{/* Product detail */}</div>;
}
```

---

## 📚 Related Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Complete architecture guide
- [`ARCHITECTURE_ADJUSTMENTS.md`](./ARCHITECTURE_ADJUSTMENTS.md) - All adjustment recommendations
- [`FEATURE_CONSTANTS_GUIDE.md`](./FEATURE_CONSTANTS_GUIDE.md) - Feature-specific constants

---

## ✅ Next Steps

1. **Integrate Config** - Update axios instance and API calls to use `API_CONFIG`
2. **Integrate Hooks** - Add hooks to components for better UX
3. **Test Everything** - Run lint, type-check, build, and dev commands
4. **Phase 2** - Implement guards folder and error handling layer
5. **Phase 3** - Add contexts, services, and Zustand stores

---

_Last Updated: Phase 1 ✅ Config & Hooks Implementation_
