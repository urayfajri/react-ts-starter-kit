# Quick Reference Card

Panduan cepat untuk mengakses tools dan patterns di React TS Starter Kit.

## 🔧 Available Tools

### Config

```typescript
import { API_CONFIG, APP_CONFIG } from "@/config";
import { HTTP_STATUS, ERROR_MESSAGES, DELAYS, DURATIONS } from "@/config/constants";

// API Configuration
API_CONFIG.BASE_URL; // "http://localhost:3000/api"
API_CONFIG.ENDPOINTS.PRODUCTS; // "/products"
API_CONFIG.ENDPOINTS.PRODUCT_DETAIL("1"); // "/products/1"
API_CONFIG.CACHE.PRODUCTS; // 5 * 60 * 1000 (5 minutes)

// App Configuration
APP_CONFIG.IS_DEV; // true/false
APP_CONFIG.FEATURES.DARK_MODE; // true/false
APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE; // 20

// Constants
(HTTP_STATUS.OK, NOT_FOUND, INTERNAL_SERVER_ERROR);
(ERROR_MESSAGES.NETWORK, SERVER, VALIDATION);
DELAYS.DEBOUNCE_SEARCH; // 300ms
DURATIONS.FADE; // 200ms
```

### Hooks

```typescript
import {
  useLocalStorage,
  useDebounce,
  useThrottle,
  useAsync,
  usePrevious,
  useMediaQuery,
} from "@/shared/hooks";

// localStorage state sync
const [theme, setTheme] = useLocalStorage("theme", "light");

// Debounce function calls
const debouncedSearch = useDebounce(handleSearch, 300);

// Throttle function calls
const throttledScroll = useThrottle(handleScroll, 100);

// Async operation state
const { data, loading, error, execute } = useAsync(() => fetchData());

// Track previous value
const prevValue = usePrevious(value);

// Detect media queries
const isMobile = useMediaQuery("(max-width: 768px)");
```

### Feature Constants

```typescript
import {
  PRODUCT_LIMITS,
  PRODUCT_STATUS,
  PRODUCT_SORT,
} from "@/features/products/constants";
import { HOME_SECTIONS, HOME_NAVIGATION } from "@/features/home/constants";

// Product constants
PRODUCT_LIMITS.NAME_MIN_LENGTH; // 3
PRODUCT_STATUS.ACTIVE; // "active"
PRODUCT_SORT.NEWEST; // "newest"

// Home constants
HOME_SECTIONS.HERO; // "hero"
HOME_NAVIGATION.PRODUCTS; // "/products"
```

---

## 📚 Documentation

| Document                                                     | Purpose                         | Read Time |
| ------------------------------------------------------------ | ------------------------------- | --------- |
| [INDEX.md](./INDEX.md)                                       | **START HERE** - Navigation hub | 5 min     |
| [ARCHITECTURE.md](./ARCHITECTURE.md)                         | Complete architecture guide     | 15 min    |
| [ARCHITECTURE_ADJUSTMENTS.md](./ARCHITECTURE_ADJUSTMENTS.md) | Phase planning & roadmap        | 20 min    |
| [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md)             | Config & hooks reference        | 30 min    |
| [FEATURE_CONSTANTS_GUIDE.md](./FEATURE_CONSTANTS_GUIDE.md)   | Feature constants pattern       | 25 min    |

---

## 🚀 Common Patterns

### Pattern 1: Persistent Theme

```typescript
import { useLocalStorage } from "@/shared/hooks";

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} />;
}
```

### Pattern 2: Debounced Search

```typescript
import { useDebounce } from "@/shared/hooks";
import { PRODUCT_TIMEOUTS } from "@/features/products/constants";

export function ProductSearch() {
  const debouncedSearch = useDebounce(
    async (query: string) => {
      const results = await searchProducts(query);
      setResults(results);
    },
    PRODUCT_TIMEOUTS.DEBOUNCE_SEARCH
  );

  return <input onChange={(e) => debouncedSearch(e.target.value)} />;
}
```

### Pattern 3: Responsive Layout

```typescript
import { useMediaQuery } from "@/shared/hooks";

export function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={isMobile ? "flex flex-col" : "grid grid-cols-3"}>
      {/* Content */}
    </div>
  );
}
```

### Pattern 4: Feature Constants Validation

```typescript
import { PRODUCT_LIMITS, PRODUCT_MESSAGES } from "@/features/products/constants";

function validateProduct(name: string): string | null {
  if (name.length < PRODUCT_LIMITS.NAME_MIN_LENGTH) {
    return PRODUCT_MESSAGES.VALIDATION_ERROR;
  }
  return null;
}
```

### Pattern 5: React Query Caching

```typescript
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_CACHE } from "@/features/products/constants";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: PRODUCT_CACHE.LIST, // 5 minutes
  });
}
```

---

## 📂 Folder Structure Quick Reference

```
src/
├── config/                    # Global config (✅ IMPLEMENTED)
│   ├── api.ts               # API endpoints, retry, cache
│   ├── app.ts               # App settings, features
│   ├── constants.ts         # HTTP status, messages, delays
│   └── index.ts             # Barrel export
│
├── features/                # Feature modules
│   ├── products/
│   │   ├── page.tsx         # Component
│   │   ├── api.ts           # API calls
│   │   ├── hooks.ts         # Custom hooks
│   │   └── constants.ts     # Feature constants (✅ IMPLEMENTED)
│   └── home/
│       ├── page.tsx
│       ├── constants.ts     # (✅ IMPLEMENTED)
│       └── ...
│
└── shared/
    ├── hooks/               # Custom hooks (✅ IMPLEMENTED)
    │   ├── useLocalStorage.ts
    │   ├── useDebounce.ts
    │   ├── useThrottle.ts
    │   ├── useAsync.ts
    │   ├── usePrevious.ts
    │   ├── useMediaQuery.ts
    │   └── index.ts
    ├── components/
    ├── libs/
    ├── utils/
    └── styles/
```

---

## ✅ Phase 1 Checklist

- [x] Config Folder (4 files: api.ts, app.ts, constants.ts, index.ts)
- [x] Shared Hooks (7 files: 6 hooks + index.ts)
- [x] Feature Constants (2 files: products/constants.ts, home/constants.ts)
- [x] Complete Documentation (5 files: INDEX.md, ARCHITECTURE.md, CONFIG_HOOKS_GUIDE.md, FEATURE_CONSTANTS_GUIDE.md, QUICK_REFERENCE.md)

**Files Created:** 18 total (14 code + 4 documentation)

---

## 🎯 Next Steps

1. **Integrate Config** - Update axios to use API_CONFIG
2. **Integrate Hooks** - Add hooks to components
3. **Phase 2** - Guards, Error handling, Feature components
4. **Phase 3** - Contexts, Services, Zustand stores

---

## 💡 Tips & Tricks

### Import Shorthand

```typescript
// Instead of:
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

// Do this:
import { useLocalStorage } from "@/shared/hooks";
```

### Type-Safe Constants

```typescript
// ✅ Good - Type inference works
export const STATUS = { ACTIVE: "active" } as const;
type Status = (typeof STATUS)[keyof typeof STATUS];

// ❌ Bad - Loose typing
export const STATUS = { ACTIVE: "active" };
```

### Feature Constants Organization

```typescript
// Group related constants
export const PRODUCT_LIMITS = { ... };
export const PRODUCT_STATUS = { ... };
export const PRODUCT_SORT = { ... };
export const PRODUCT_MESSAGES = { ... };

// Export derived types
export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];
```

### Environment Variables

```typescript
// Use in config files
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// Create .env.local file:
# VITE_API_URL=https://api.example.com
```

---

## 🔗 Useful Links

- [INDEX.md](./INDEX.md) - Start here for navigation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Full architecture guide
- [ARCHITECTURE_ADJUSTMENTS.md](./ARCHITECTURE_ADJUSTMENTS.md) - Roadmap & phases
- [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) - Config & Hooks API
- [FEATURE_CONSTANTS_GUIDE.md](./FEATURE_CONSTANTS_GUIDE.md) - Constants pattern

---

## ❓ FAQ

**Q: Dimana import config?**
A: `import { API_CONFIG, APP_CONFIG } from "@/config"`

**Q: Dimana import hooks?**
A: `import { useLocalStorage, useDebounce, ... } from "@/shared/hooks"`

**Q: Gimana buat feature constants?**
A: Buat `src/features/{feature}/constants.ts` dengan `as const` objects

**Q: Berapa cache duration products?**
A: `PRODUCT_CACHE.LIST` = 5 minutes (dari `src/features/products/constants.ts`)

**Q: Gimana gunakan localStorage hook?**
A: `const [value, setValue] = useLocalStorage("key", initialValue)`

**Q: Berapa debounce delay search?**
A: `PRODUCT_TIMEOUTS.DEBOUNCE_SEARCH` = 300ms

---

_Last Updated: Phase 1 ✅_
_For full details, see [INDEX.md](./INDEX.md)_
