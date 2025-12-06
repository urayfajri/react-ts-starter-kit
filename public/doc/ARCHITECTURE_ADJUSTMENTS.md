# Architecture Adjustment Recommendations

## Current State Analysis ✅

Struktur saat ini sudah baik, tapi ada beberapa penyesuaian yang bisa meningkatkan maintainability dan scalability.

---

## 🎯 Recommended Adjustments

### 1. **Add Constants & Configs Folder** ✅ IMPLEMENTED

Untuk centralized configuration dan constants:

```
src/
├── config/                       # ✅ DONE
│   ├── api.ts                   # API base URLs, endpoints
│   ├── app.ts                   # App configuration
│   ├── constants.ts             # Global constants
│   └── index.ts                 # Barrel export
```

**Status:** ✅ Implemented in `src/config/`
**Files Created:**

- `api.ts` - API configuration dengan endpoints dinamis
- `app.ts` - App settings, features, validation
- `constants.ts` - HTTP status, messages, delays, durations
- `index.ts` - Barrel export

**Next Step:** Update API calls untuk use `API_CONFIG`

See [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) for detailed usage.

---

### 2. **Add Hooks Folder untuk Shared Hooks** ✅ IMPLEMENTED

Untuk custom hooks yang reusable across features:

```
src/shared/
├── hooks/                        # ✅ DONE
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useThrottle.ts
│   ├── useAsync.ts
│   ├── usePrevious.ts
│   ├── useMediaQuery.ts
│   └── index.ts
```

**Status:** ✅ Implemented in `src/shared/hooks/`
**Hooks Created:**

- `useLocalStorage` - State sync dengan localStorage
- `useDebounce` - Debounce untuk search, input
- `useThrottle` - Throttle untuk scroll, resize
- `useAsync` - Async state management
- `usePrevious` - Track previous value
- `useMediaQuery` - Responsive design detection

**Next Step:** Integrate ke components (theme toggle, search, responsive layout)

See [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) for detailed examples.

---

### 3. **Add Guards/Middleware Folder** ⏳ TODO

Untuk route guards, auth checks, etc:

```
src/
├── guards/                       # ← PLANNED
│   ├── ProtectedRoute.tsx
│   ├── AuthGuard.tsx
│   └── index.ts
```

**Benefit:** Centralized logic untuk route protection dan middleware.

**Priority:** Phase 2 (Important) 🟠

---

### 4. **Add Contexts Folder (Optional)** ⏳ TODO

Jika menggunakan React Context, pisahkan dari component:

```
src/shared/
├── contexts/                     # ← PLANNED
│   ├── ThemeContext.tsx
│   ├── AuthContext.tsx
│   └── index.ts
```

**Benefit:** Separasi Context logic dari component logic.

**Priority:** Phase 3 (Nice to Have) 🟡

---

### 5. **Feature Module Enhancement** ⏳ TODO

Tambahkan struktur yang lebih complete per feature:

```
src/features/products/
├── api.ts                       # API calls
├── hooks.ts                     # Custom hooks
├── page.tsx                     # Main page/route
├── components/                  # ← NEW (optional)
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── index.ts
├── constants.ts                 # ← NEW (optional)
├── stores/                      # ← NEW (optional, jika pakai Zustand)
│   └── productStore.ts
└── __tests__/                   # ← NEW (optional)
    ├── api.test.ts
    ├── hooks.test.ts
    └── page.test.ts
```

**Benefit:** Feature lebih modular, mudah di-test dan scale.

**Priority:** Phase 2 (Important) 🟠

---

### 6. **Add Enums & Constants per Feature** ✅ IMPLEMENTED

```
src/features/products/
├── constants.ts                 # ✅ DONE
├── api.ts
├── hooks.ts
└── page.tsx

src/features/home/
├── constants.ts                 # ✅ DONE
└── page.tsx
```

**Status:** ✅ Implemented in feature folders
**Files Created:**

- `src/features/products/constants.ts` - Product-specific constants (limits, status, sort, filters, messages)
- `src/features/home/constants.ts` - Home-specific constants (sections, features, navigation, CTA)

**Features:**
- Type-safe enums and constants per feature
- Centralized validation limits and constraints
- Feature-specific error/success messages
- Cache configurations per feature
- API timeout and animation timings
- Type utilities for advanced typing (e.g., `type ProductSort = ...`)

**Benefits:**
- Magic strings eliminated
- Type-safe constants with IntelliSense
- Feature isolation and modularity
- Easy to maintain and scale per domain
- Reduces duplicate constants across features

**Pattern:**
```typescript
// src/features/products/constants.ts
export const PRODUCT_LIMITS = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 100,
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
} as const;

export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];
```

**Next Step:** Use in product API, components, and validation logic

**Priority:** ✅ COMPLETED (Phase 1 Enhancement)

---

### 7. **Add Error Handling Layer** ⏳ TODO

```
src/shared/
├── errors/                      # ← NEW
│   ├── AppError.ts              # Custom error class
│   ├── ErrorBoundary.tsx        # Error boundary component
│   └── index.ts
```

**Benefit:** Consistent error management di seluruh app.

**Priority:** Phase 2 (Important) 🟠

---

### 8. **Add Services Layer (Optional)** ⏳ TODO

Untuk business logic yang kompleks:

```
src/shared/
├── services/                    # ← NEW
│   ├── storageService.ts
│   ├── notificationService.ts
│   └── index.ts
```

**Benefit:** Business logic terpisah dari hooks, lebih testable.

**Priority:** Phase 3 (Nice to Have) 🟡

---

## 📊 Recommended Structure (Complete)

```
src/
├── app/                          # Application core
├── config/                       # ✅ IMPLEMENTED
├── features/                     # Feature modules
├── guards/                       # ⏳ TODO
├── shared/
│   ├── components/
│   ├── contexts/                 # ⏳ TODO
│   ├── errors/                   # ⏳ TODO
│   ├── hooks/                    # ✅ IMPLEMENTED
│   ├── libs/
│   ├── services/                 # ⏳ TODO
│   ├── styles/
│   └── utils/
├── types/                        # Global types
├── main.tsx
└── vite-env.d.ts
```

---

## 🚀 Implementation Phases

### Phase 1 (Essential) 🔴 - Current Sprint ✅ COMPLETED

- ✅ Add `config/` folder - DONE
- ✅ Add `shared/hooks/` folder - DONE
- ⏳ Update axios instance untuk use `API_CONFIG`
- ⏳ Update API calls untuk use `API_CONFIG.ENDPOINTS`
- ⏳ Integrate hooks ke components

### Phase 2 (Important) 🟠 - Next Sprint

- ⏳ Add `guards/` folder for route protection
- ⏳ Add `shared/errors/` folder with AppError and ErrorBoundary
- ⏳ Feature-specific components in `features/*/components/`
- ⏳ Add constants.ts to features
- ⏳ Create ProductCard, ProductForm components

### Phase 3 (Nice to Have) 🟡 - Future

- ⏳ Add `shared/contexts/` folder
- ⏳ Add `shared/services/` folder
- ⏳ Feature stores (Zustand for complex state)

---

## ✅ Implementation Checklist

### Phase 1 - Config & Hooks

- [x] Create `src/config/` folder with api.ts, app.ts, constants.ts
- [x] Create `src/shared/hooks/` folder with 6 custom hooks
- [x] Create `CONFIG_HOOKS_GUIDE.md` dengan usage examples
- [ ] Update `src/shared/libs/api/axios.ts` dengan `API_CONFIG`
- [ ] Update `src/features/products/api.ts` untuk use `API_CONFIG.ENDPOINTS`
- [ ] Integrate hooks ke theme toggle component
- [ ] Integrate useDebounce ke search component
- [ ] Test semua config dan hooks

### Phase 2 - Guards, Errors, Components

- [ ] Create `src/guards/` folder for route protection
- [ ] Create `src/shared/errors/` folder with AppError and ErrorBoundary
- [ ] Add constants.ts to features (products, home, etc)
- [ ] Create feature-specific components in `features/*/components/`
- [ ] Update ARCHITECTURE.md dengan struktur baru

### Phase 3 - Contexts, Services, Stores

- [ ] Create `src/shared/contexts/` folder
- [ ] Create `src/shared/services/` folder
- [ ] Add feature stores (Zustand) jika diperlukan

---

## 💡 Key Achievements

✅ **Phase 1 Completed:**

1. **Config Folder** - Centralized API URLs, endpoints, app settings, constants
2. **Shared Hooks** - 6 reusable custom hooks (localStorage, debounce, throttle, async, previous, mediaquery)
3. **Documentation** - CONFIG_HOOKS_GUIDE.md dengan examples dan checklist

✅ **Benefits Gained:**

- Type-safe configuration management
- Reusable custom hooks across features
- Single source of truth untuk config
- Improved code reusability
- Better maintainability

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Main architecture guide
- **[CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md)** - Config & Hooks usage with examples ⭐ START HERE
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guidelines with conventional commits
- **[README.md](./README.md)** - Project overview

---

**Current Status: Phase 1 ✅ COMPLETED**

Next steps:

1. Follow [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) integration steps
2. Plan Phase 2 implementation
3. Create GitHub issues untuk Phase 2 tasks

**Happy Coding! 🚀**

```
src/
├── config/                       # ← NEW
│   ├── api.ts                   # API base URLs, endpoints
│   ├── app.ts                   # App configuration
│   └── constants.ts             # Global constants
```

**Benefit:** Mudah manage configuration dari satu tempat, tidak tersebar di berbagai file.

**Example:**

```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  TIMEOUT: 30000,
  ENDPOINTS: {
    PRODUCTS: "/products",
    USERS: "/users",
    AUTH: "/auth",
  },
};

// Usage
import { API_CONFIG } from "@/config/api";
const res = await api.get(API_CONFIG.ENDPOINTS.PRODUCTS);
```

---

### 2. **Add Hooks Folder untuk Shared Hooks**

Untuk custom hooks yang reusable across features:

```
src/shared/
├── hooks/                        # ← NEW
│   ├── useAsync.ts
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── index.ts
```

**Benefit:** Reusable logic yang tidak spesifik ke feature tertentu.

**Example:**

```typescript
// src/shared/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation
}

// Usage
import { useLocalStorage } from "@/shared/hooks";
const [theme, setTheme] = useLocalStorage("theme", "light");
```

---

### 3. **Add Guards/Middleware Folder**

Untuk route guards, auth checks, etc:

```
src/
├── guards/                       # ← NEW
│   ├── ProtectedRoute.tsx
│   ├── AuthGuard.tsx
│   └── index.ts
```

**Benefit:** Centralized logic untuk route protection dan middleware.

---

### 4. **Add Contexts Folder (Optional)**

Jika menggunakan React Context, pisahkan dari component:

```
src/shared/
├── contexts/                     # ← NEW
│   ├── ThemeContext.tsx
│   ├── AuthContext.tsx
│   └── index.ts
```

**Benefit:** Separasi Context logic dari component logic.

---

### 5. **Feature Module Enhancement**

Tambahkan struktur yang lebih complete per feature:

```
src/features/products/
├── api.ts                       # API calls
├── hooks.ts                     # Custom hooks
├── page.tsx                     # Main page/route
├── components/                  # ← NEW (optional)
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── index.ts
├── stores/                      # ← NEW (optional, jika pakai Zustand)
│   └── productStore.ts
└── __tests__/                   # ← NEW (optional)
    ├── api.test.ts
    ├── hooks.test.ts
    └── page.test.ts
```

**Benefit:** Feature lebih modular, mudah di-test dan scale.

---

### 6. **Add Enums & Constants per Feature**

```
src/features/products/
├── constants.ts                 # ← NEW
├── api.ts
├── hooks.ts
└── page.tsx

// src/features/products/constants.ts
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
} as const;

export const PRODUCT_SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
] as const;
```

**Benefit:** Magic strings dieliminasi, type-safe constants.

---

### 7. **Add Error Handling Layer**

```
src/shared/
├── errors/                      # ← NEW
│   ├── AppError.ts              # Custom error class
│   ├── ErrorBoundary.tsx        # Error boundary component
│   └── index.ts
```

**Example:**

```typescript
// src/shared/errors/AppError.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message);
  }
}

// Usage
throw new AppError("Product not found", "PRODUCT_NOT_FOUND", 404);
```

---

### 8. **Add Services Layer (Optional)**

Untuk business logic yang kompleks:

```
src/shared/
├── services/                    # ← NEW
│   ├── storageService.ts
│   ├── notificationService.ts
│   └── index.ts
```

**Benefit:** Business logic terpisah dari hooks, lebih testable.

---

## 📊 Recommended Structure (Complete)

```
src/
├── app/                          # Application core
│   ├── App.tsx
│   ├── routes.tsx
│   ├── providers.tsx
│   └── theme.tsx
│
├── config/                       # NEW: Global configuration
│   ├── api.ts
│   ├── app.ts
│   └── constants.ts
│
├── features/                     # Feature modules
│   ├── home/
│   │   ├── page.tsx
│   │   ├── api.ts
│   │   └── hooks.ts
│   └── products/
│       ├── page.tsx
│       ├── api.ts
│       ├── hooks.ts
│       ├── constants.ts          # NEW: Feature constants
│       └── components/           # NEW: Feature-specific components
│           ├── ProductCard.tsx
│           └── index.ts
│
├── guards/                       # NEW: Route guards & middleware
│   ├── ProtectedRoute.tsx
│   └── index.ts
│
├── shared/                       # Shared utilities
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── contexts/                 # NEW: Context providers
│   ├── errors/                   # NEW: Error handling
│   ├── hooks/                    # NEW: Shared custom hooks
│   ├── libs/
│   ├── services/                 # NEW: Business logic services
│   ├── styles/
│   └── utils/
│
├── types/                        # Global types
│   ├── product/
│   ├── auth/
│   └── index.ts
│
├── main.tsx
└── vite-env.d.ts
```

---

## 🚀 Implementation Priority

### Phase 1 (Essential) 🔴

- ✅ Add `config/` folder
- ✅ Add `shared/hooks/` folder
- ✅ Add feature constants

### Phase 2 (Important) 🟠

- ✅ Add `guards/` folder
- ✅ Add `shared/errors/` folder
- ✅ Feature-specific components in `features/*/components/`

### Phase 3 (Nice to Have) 🟡

- ✅ Add `shared/contexts/` folder
- ✅ Add `shared/services/` folder
- ✅ Feature stores (`Zustand`)

---

## ✅ Checklist for Implementation

- [ ] Create `src/config/` folder with api.ts, app.ts, constants.ts
- [ ] Create `src/shared/hooks/` folder
- [ ] Create `src/shared/errors/` folder with AppError and ErrorBoundary
- [ ] Create `src/guards/` folder for route protection
- [ ] Add constants.ts to features (products, home, etc)
- [ ] Add components/ subfolder to features
- [ ] Update imports throughout the app
- [ ] Update ARCHITECTURE.md dengan struktur baru
- [ ] Update README.md jika diperlukan

---

## 💡 Quick Wins (No Breaking Changes)

Bisa langsung diimplementasikan tanpa refactor besar:

1. **Add config folder** - Centralize API URLs dan constants
2. **Add shared/hooks** - Move reusable hooks here
3. **Add feature constants** - Replace magic strings
4. **Add error handling** - Better error management

---

## 🎓 Why These Changes Matter

| Aspect                 | Benefit                                    |
| ---------------------- | ------------------------------------------ |
| **Config folder**      | Single source of truth untuk configuration |
| **Shared hooks**       | Code reuse across features                 |
| **Guards**             | Centralized auth & route protection        |
| **Feature components** | Better feature encapsulation               |
| **Error handling**     | Consistent error management                |
| **Services**           | Clean separation of concerns               |
| **Constants**          | Type-safe, no magic strings                |

---

**Choose which adjustments yang paling sesuai dengan kebutuhan project kamu! 🚀**
