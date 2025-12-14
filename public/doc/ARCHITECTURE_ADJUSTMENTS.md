# Architecture Adjustment Recommendations

## Current State Analysis ✅

Struktur saat ini sudah baik, tapi ada beberapa penyesuaian yang bisa meningkatkan maintainability dan scalability.

---

## 📊 Recommended Structure (Complete)

```
src/
├── app/                          # Application core
├── config/                       # ✅ IMPLEMENTED
├── features/                     # Feature modules
├── guards/                       # ✅ IMPLEMENTED
├── shared/
│   ├── components/
│   ├── contexts/                 # ⏳ TODO
│   ├── errors/                   # ✅ IMPLEMENTED
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

## ✅ Implementation Checklist

### Phase 1 - Config & Hooks

- [x] Create `src/config/` folder with api.ts, app.ts, constants.ts
- [x] Create `src/shared/hooks/` folder with 6 custom hooks
- [x] Create `CONFIG_HOOKS_GUIDE.md` dengan usage examples
- [x] Update `src/shared/libs/api/axios.ts` dengan `API_CONFIG`
- [x] Update `src/features/products/api.ts` untuk use `API_CONFIG.ENDPOINTS`
- [x] Integrate hooks ke theme toggle component
- [x] Integrate useDebounce ke search component
- [x] Test semua config dan hooks

### Phase 2 - Guards, Errors, Components

- [x] Create `src/guards/` folder for route protection
- [x] Create `src/shared/errors/` folder with AppError and ErrorBoundary
- [x] Add constants.ts to features (products, home, etc)
- [x] Create feature-specific components in `features/*/components/`

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

- [] Add `shared/contexts/` folder
- [] Add `shared/services/` folder
- [] Feature stores (`Zustand`)

---

## ✅ Checklist for Implementation

- [x] Create `src/config/` folder with api.ts, app.ts, constants.ts
- [x] Create `src/shared/hooks/` folder
- [x] Create `src/shared/errors/` folder with AppError and ErrorBoundary
- [x] Create `src/guards/` folder for route protection
- [x] Add constants.ts to features (products, home, etc)
- [x] Add components/ subfolder to features
- [x] Update imports throughout the app

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
