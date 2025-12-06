# Feature Constants Pattern Guide

Panduan lengkap untuk menggunakan Feature Constants - Type-safe constants per feature module.

## Overview

Feature Constants adalah type-safe constants yang didefinisikan per feature module. Ini membantu:

- ✅ Mengeliminasi magic strings
- ✅ Menyediakan autocomplete via IntelliSense
- ✅ Mempermudah maintenance dan refactoring
- ✅ Isolasi domain-specific constants
- ✅ Reduce bugs dari typos

## Struktur

### Global Constants (`src/config/constants.ts`)

Untuk app-wide constants yang digunakan di berbagai features:

```typescript
export const HTTP_STATUS = { OK: 200, CREATED: 201, ... };
export const ERROR_MESSAGES = { NETWORK: "...", SERVER: "...", ... };
export const DELAYS = { DEBOUNCE_SEARCH: 300, ... };
```

### Feature Constants (`src/features/{feature}/constants.ts`)

Untuk domain-specific constants yang hanya digunakan di satu feature:

```typescript
export const PRODUCT_LIMITS = { NAME_MIN_LENGTH: 3, ... };
export const PRODUCT_STATUS = { ACTIVE: "active", ... };
```

## Files Created

### 1. `src/features/products/constants.ts`

```typescript
// Product limits and constraints
export const PRODUCT_LIMITS = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  PRICE_MIN: 0,
  PRICE_MAX: 999999.99,
} as const;

// Product sort options
export const PRODUCT_SORT = {
  NEWEST: "newest",
  OLDEST: "oldest",
  NAME_ASC: "name-asc",
  NAME_DESC: "name-desc",
  PRICE_LOW: "price-low",
  PRICE_HIGH: "price-high",
} as const;

// Product status/state
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
  DRAFT: "draft",
} as const;

// Type-safe types derived from constants
export type ProductSort = (typeof PRODUCT_SORT)[keyof typeof PRODUCT_SORT];
export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
```

**Contains:**

- Validation limits (name, description, price bounds)
- Sort options (newest, oldest, name, price)
- Status enums (active, inactive, archived, draft)
- Filter options (all, active, inactive, recently-added, bestseller)
- Pagination defaults (page size options)
- Product-specific messages (fetch error, create/update/delete success/error)
- Cache durations (list, detail, search)
- Timeout configurations (API, debounce, filter)
- UI constants (skeleton rows, grid items, toast duration)

### 2. `src/features/home/constants.ts`

```typescript
// Home page sections
export const HOME_SECTIONS = {
  HERO: "hero",
  FEATURES: "features",
  SHOWCASE: "showcase",
  CTA: "call-to-action",
  FAQ: "faq",
} as const;

// Feature cards data
export const HOME_FEATURES = {
  COUNT: 3,
  TITLES: {
    REACT: "React 19",
    TYPESCRIPT: "TypeScript",
    TAILWIND: "TailwindCSS",
  } as const,
  DESCRIPTIONS: {
    REACT: "Latest React features with server components ready",
    TYPESCRIPT: "Fully typed for safety and better DX",
    TAILWIND: "Utility-first CSS for rapid UI development",
  } as const,
} as const;

// Type-safe types
export type HomeSection = (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS];
```

**Contains:**

- Page sections (hero, features, showcase, CTA, FAQ)
- Feature card titles and descriptions
- Navigation links
- CTA configuration
- Content messaging
- Cache settings
- Animation timings

## Usage Examples

### 1. Form Validation

```typescript
// src/features/products/page.tsx
import { PRODUCT_LIMITS, PRODUCT_MESSAGES } from "./constants";

function validateProductName(name: string): string | null {
  if (name.length < PRODUCT_LIMITS.NAME_MIN_LENGTH) {
    return PRODUCT_MESSAGES.VALIDATION_ERROR;
  }
  if (name.length > PRODUCT_LIMITS.NAME_MAX_LENGTH) {
    return `Name must be at most ${PRODUCT_LIMITS.NAME_MAX_LENGTH} characters`;
  }
  return null;
}
```

### 2. Status Filtering

```typescript
// src/features/products/page.tsx
import { PRODUCT_STATUS, PRODUCT_FILTERS } from "./constants";

function getStatusBadgeColor(
  status: (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS],
): string {
  switch (status) {
    case PRODUCT_STATUS.ACTIVE:
      return "bg-green-500";
    case PRODUCT_STATUS.INACTIVE:
      return "bg-gray-500";
    case PRODUCT_STATUS.ARCHIVED:
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
}

// Get all available filters
const filters = Object.values(PRODUCT_FILTERS);
```

### 3. Sorting Options

```typescript
// src/features/products/page.tsx
import { PRODUCT_SORT } from "./constants";

export function ProductList() {
  const [sortBy, setSortBy] = useState<typeof PRODUCT_SORT[keyof typeof PRODUCT_SORT]>(
    PRODUCT_SORT.NEWEST
  );

  const sortOptions = Object.entries(PRODUCT_SORT).map(([key, value]) => ({
    label: key,
    value,
  }));

  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
```

### 4. Debounced Search with Timeouts

```typescript
// src/features/products/page.tsx
import { useDebounce } from "@/shared/hooks";
import { PRODUCT_TIMEOUTS, PRODUCT_MESSAGES } from "./constants";

export function ProductSearch() {
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce(
    async (query: string) => {
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (error) {
        console.error(PRODUCT_MESSAGES.FETCH_ERROR);
      }
    },
    PRODUCT_TIMEOUTS.DEBOUNCE_SEARCH  // 300ms
  );

  return (
    <input
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search products..."
    />
  );
}
```

### 5. Cache Configuration

```typescript
// src/features/products/api.ts
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_CACHE } from "./constants";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: PRODUCT_CACHE.LIST, // 5 minutes
  });
}

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id),
    staleTime: PRODUCT_CACHE.DETAIL, // 10 minutes
  });
}
```

### 6. Error Handling with Feature Messages

```typescript
// src/features/products/api.ts
import { PRODUCT_MESSAGES } from "./constants";

export async function createProduct(data: CreateProductRequest) {
  try {
    const response = await api.post("/products", data);
    return {
      success: true,
      message: PRODUCT_MESSAGES.CREATE_SUCCESS,
      data: response.data,
    };
  } catch (error) {
    if (error.response?.status === 409) {
      return {
        success: false,
        message: PRODUCT_MESSAGES.DUPLICATE_NAME,
      };
    }
    return {
      success: false,
      message: PRODUCT_MESSAGES.CREATE_ERROR,
    };
  }
}
```

### 7. Type-Safe Constants

```typescript
// src/features/products/constants.ts
export type ProductSort = (typeof PRODUCT_SORT)[keyof typeof PRODUCT_SORT];
export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

// src/features/products/page.tsx
import type { ProductSort, ProductStatus } from "./constants";

interface ProductFilter {
  sort: ProductSort; // Only accepts valid PRODUCT_SORT values
  status: ProductStatus; // Only accepts valid PRODUCT_STATUS values
}

// This will error at compile-time if invalid value is used
const filter: ProductFilter = {
  sort: "newest", // ✅ Valid
  status: "active", // ✅ Valid
  // sort: "invalid"           // ❌ TypeScript error
};
```

### 8. Feature Navigation

```typescript
// src/features/home/constants.ts
export const HOME_NAVIGATION = {
  HOME: "/",
  PRODUCTS: "/products",
  DOCS: "/docs",
  GITHUB: "https://github.com",
} as const;

// src/features/home/page.tsx
import { HOME_NAVIGATION, HOME_MESSAGES } from "./constants";

export function HomePage() {
  return (
    <nav>
      <a href={HOME_NAVIGATION.HOME}>Home</a>
      <a href={HOME_NAVIGATION.PRODUCTS}>Products</a>
      <a href={HOME_NAVIGATION.DOCS}>Docs</a>
    </nav>
  );
}
```

### 9. Animation Timing

```typescript
// src/features/home/constants.ts
export const HOME_ANIMATIONS = {
  FADE_IN: 300,
  SLIDE_UP: 400,
  STAGGER_DELAY: 100,
} as const;

// src/features/home/page.tsx
import { HOME_ANIMATIONS } from "./constants";

export function FeatureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: HOME_ANIMATIONS.FADE_IN / 1000 }}
    >
      Feature Card
    </motion.div>
  );
}
```

## Best Practices

### 1. ✅ Always Use `as const`

```typescript
// Good - Enables type inference
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

// Bad - Loose typing
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};
```

### 2. ✅ Group Related Constants

```typescript
// Good - Logical grouping
export const PRODUCT_LIMITS = { ... };
export const PRODUCT_SORT = { ... };
export const PRODUCT_STATUS = { ... };

// Bad - Mixed constants
export const PRODUCT_NAME_MIN = 3;
export const PRODUCT_SORT_NEWEST = "newest";
export const PRODUCT_ACTIVE = "active";
```

### 3. ✅ Export Type Utilities

```typescript
// Good - Type-safe usage
export type ProductSort = (typeof PRODUCT_SORT)[keyof typeof PRODUCT_SORT];

const sort: ProductSort = "newest"; // ✅ Valid
// const sort: ProductSort = "invalid";  // ❌ Error

// Less ideal - Less type-safe
export type ProductSort = "newest" | "oldest"; // Easy to get out of sync
```

### 4. ✅ Add JSDoc Comments

```typescript
/**
 * Product Status Enum
 *
 * @example
 * if (product.status === PRODUCT_STATUS.ACTIVE) { ... }
 */
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
```

### 5. ✅ Separate Global vs Feature Constants

```typescript
// src/config/constants.ts - Global
export const ERROR_MESSAGES = {
  NETWORK: "Network error...",
  SERVER: "Server error...",
} as const;

// src/features/products/constants.ts - Feature-specific
export const PRODUCT_MESSAGES = {
  FETCH_ERROR: "Failed to fetch products...",
  CREATE_SUCCESS: "Product created successfully...",
} as const;
```

### 6. ✅ Use for Magic String Elimination

```typescript
// Before - Magic strings everywhere
const products = data.filter((p) => p.status === "active");
const isSorted = sort === "newest";
const delay = 300;

// After - Using constants
const products = data.filter((p) => p.status === PRODUCT_STATUS.ACTIVE);
const isSorted = sort === PRODUCT_SORT.NEWEST;
const delay = PRODUCT_TIMEOUTS.DEBOUNCE_SEARCH;
```

## Integration Checklist

When creating a new feature, follow this checklist:

### ✅ Phase 1 - Feature Setup

- [ ] Create `src/features/{feature}/page.tsx` (main component)
- [ ] Create `src/features/{feature}/api.ts` (API calls)
- [ ] Create `src/features/{feature}/hooks.ts` (custom hooks)
- [ ] Create `src/features/{feature}/constants.ts` (feature constants)

### ✅ Phase 2 - Types

- [ ] Create `src/types/{feature}/` folder
- [ ] Create entity types in `product.ts`
- [ ] Create request DTOs in `request.ts`
- [ ] Create response DTOs in `response.ts`
- [ ] Add barrel export in `index.ts`

### ✅ Phase 3 - Components (Optional)

- [ ] Create `src/features/{feature}/components/` folder
- [ ] Extract components as needed
- [ ] Use constants in component logic

### ✅ Phase 4 - Store (Optional)

- [ ] Create `src/features/{feature}/stores/` folder
- [ ] Setup Zustand store if needed
- [ ] Use feature constants in store actions

### ✅ Phase 5 - Tests (Optional)

- [ ] Create `src/features/{feature}/__tests__/` folder
- [ ] Test API calls with mocked constants
- [ ] Test hooks with feature constants
- [ ] Test validation with LIMITS constants

## Migration Guide (Existing Features)

If you have existing features without constants file:

### Step 1: Extract Magic Strings

```typescript
// Before - src/features/products/page.tsx
const status = "active";
const delay = 300;

// After
// 1. Create src/features/products/constants.ts
export const PRODUCT_STATUS = { ACTIVE: "active" } as const;
export const PRODUCT_TIMEOUTS = { DEBOUNCE_SEARCH: 300 } as const;

// 2. Update page.tsx
import { PRODUCT_STATUS, PRODUCT_TIMEOUTS } from "./constants";
const status = PRODUCT_STATUS.ACTIVE;
const delay = PRODUCT_TIMEOUTS.DEBOUNCE_SEARCH;
```

### Step 2: Replace Hardcoded Values

```typescript
// Before
const minLength = 3;
const maxLength = 100;

// After
import { PRODUCT_LIMITS } from "./constants";
const minLength = PRODUCT_LIMITS.NAME_MIN_LENGTH;
const maxLength = PRODUCT_LIMITS.NAME_MAX_LENGTH;
```

### Step 3: Use in Validation

```typescript
// Before
if (name.length < 3 || name.length > 100) { ... }

// After
import { PRODUCT_LIMITS } from "./constants";
if (name.length < PRODUCT_LIMITS.NAME_MIN_LENGTH ||
    name.length > PRODUCT_LIMITS.NAME_MAX_LENGTH) { ... }
```

## File Reference

| File                                 | Purpose          | Contains                                                         |
| ------------------------------------ | ---------------- | ---------------------------------------------------------------- |
| `src/config/constants.ts`            | Global constants | HTTP status, error messages, delays, durations                   |
| `src/features/products/constants.ts` | Product domain   | Limits, status, sort, filters, messages, cache, timeouts, UI     |
| `src/features/home/constants.ts`     | Home domain      | Sections, features, navigation, CTA, messages, cache, animations |

## Related Documentation

- `ARCHITECTURE.md` - Complete architecture guide
- `ARCHITECTURE_ADJUSTMENTS.md` - Architecture improvements
- `CONFIG_HOOKS_GUIDE.md` - Config folder and hooks usage

## Next Steps

1. **Create Feature Constants for New Features** - When adding new features, always create a `constants.ts` file
2. **Migrate Existing Features** - Extract magic strings from existing features into constants
3. **Phase 2 Implementation** - Consider guards, error handling, and feature components
4. **Phase 3 Implementation** - Add contexts, services, and Zustand stores if needed

---

_Last Updated: Phase 1 ✅ Feature Constants Implementation_
