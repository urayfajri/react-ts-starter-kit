# Modular Architecture Guide

Panduan lengkap untuk struktur arsitektur modular React TS Starter Kit.

## 📁 Folder Structure

```
src/
├── app/                          # Application core
│   ├── App.tsx                   # Main app component
│   ├── routes.tsx                # Route definitions
│   ├── providers.tsx             # Global providers (theme, query, etc)
│   └── theme.tsx                 # Theme configuration
│
├── config/                       # ✅ Centralized configuration
│   ├── api.ts                   # API config, endpoints
│   ├── app.ts                   # App settings, features
│   ├── constants.ts             # Global constants
│   └── index.ts                 # Barrel export
│
├── features/                     # Feature modules (domain-driven)
│   ├── home/
│   │   ├── page.tsx              # Feature page/route
│   │   ├── constants.ts          # ✅ Feature-specific constants
│   │   └── (api.ts, hooks.ts)    # Optional when feature needs API/hooks
│   │
│   └── products/
│       ├── page.tsx
│       ├── api.ts
│       ├── hooks.ts
│       ├── constants.ts          # ✅ Feature-specific constants
│       └── components/           # Feature-specific components
│           ├── ProductCard.tsx
│           ├── ProductForm.tsx
│           └── index.ts          # Barrel export (optional)
│
├── guards/                       # Route guards & middleware
│   ├── AuthGuard.ts              # Auth utilities (isAuthenticated, getAuthToken)
│   └── ProtectedRoute.tsx       # Route wrapper component
│
├── shared/                       # Shared utilities & components
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ComponentShowcase.tsx
│   │   └── ui/                   # UI primitives (shadcn/ui)
│   │       └── button.tsx
|   ├── errors/                   # AppError and ErrorBoundary
│   ├── hooks/                    # ✅ Reusable custom hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── useThrottle.ts
│   │   ├── useAsync.ts
│   │   ├── usePrevious.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   ├── libs/
│   │   ├── queryClient.ts        # React Query setup
│   │   └── api/
│   │       └── axios.ts          # Axios instance
│   ├── styles/
│   │   └── globals.css           # Global styles
│   └── utils/
│       └── cn.ts                 # Class name utility
│
├── types/                        # Global type definitions
│   ├── index.ts
│   └── product/
│       ├── product.ts            # Entity types
│       ├── request.ts            # Request DTOs
│       ├── response.ts           # Response DTOs
│       └── index.ts              # Barrel export
│
├── main.tsx                      # Entry point
└── vite-env.d.ts                # Vite env types
```

## 🎯 Architecture Principles

### 1. **Feature-First Organization**

- Setiap feature di folder `features/` memiliki domain sendiri
- Contoh: `products/`, `home/`, `auth/`, `dashboard/`
- Mudah untuk isolasi, test, dan maintain

### 2. **Separation of Concerns**

```
features/products/
├── page.tsx          # UI/Component logic
├── api.ts            # API calls
├── hooks.ts          # Custom hooks (business logic)
└── (types terpisah di src/types/product/)
```

### 3. **Centralized Types**

```
src/types/
├── product/
│   ├── product.ts    # Entities
│   ├── request.ts    # DTOs untuk request
│   ├── response.ts   # DTOs untuk response
│   └── index.ts      # Barrel export
```

### 4. **Shared Resources**

- `shared/components/` - Reusable UI components
- `shared/hooks/` - Custom hooks (localStorage, debounce, throttle, async, mediaquery, previous)
- `shared/libs/` - Core libraries & setup
- `shared/utils/` - Helper functions
- `shared/styles/` - Global styles

### 5. **Centralized Configuration**

- `config/api.ts` - API base URLs, endpoints, retry config, cache config
- `config/app.ts` - App settings, features, validation rules, pagination
- `config/constants.ts` - HTTP status codes, error messages, success messages, delays

## 📦 Module Communication

### Feature to Feature

```typescript
// features/products/api.ts
import type { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  return res.data;
}
```

### Feature to Shared

```typescript
// features/products/page.tsx
import { Button } from "@/shared/components/ui/button";
import Header from "@/shared/components/layout/Header";
```

### Using Global Types

```typescript
// Anywhere in the app
import type { Product, CreateProductRequest } from "@/types/product";
```

## 🔄 Data Flow

```
UI (Component)
    ↓
hooks.ts (Custom Hook - Business Logic)
    ↓
api.ts (API Call)
    ↓
@/types/product (Type Definitions)
    ↓
Server/Backend
```

## ✅ Best Practices

### 1. **Keep Features Independent**

```typescript
// ✅ Good: Feature imports dari shared dan types
import { Button } from "@/shared/components/ui/button";
import type { Product } from "@/types/product";

// ❌ Avoid: Feature imports dari feature lain
import { useProducts } from "@/features/products/hooks";
```

### 2. **Use Barrel Exports**

```typescript
// src/types/product/index.ts
export type { Product } from "./product";
export type { CreateProductRequest, UpdateProductRequest } from "./request";
export type { ProductResponse, ProductListResponse } from "./response";

// Usage anywhere
import type { Product, CreateProductRequest } from "@/types/product";
```

### 3. **Organize by Feature, Not by Type**

```
// ✅ Good: Organized by feature
features/
├── products/
│   ├── api.ts
│   ├── hooks.ts
│   └── page.tsx

// ❌ Avoid: Organized by file type
features/
├── api/
├── hooks/
└── pages/
```

### 4. **Centralize API Setup**

```typescript
// shared/libs/api/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Usage in features
import { api } from "@/shared/libs/api/axios";
```

### 5. **Use React Query for Data**

```typescript
// features/products/hooks.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProducts, createProduct } from "./api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
  });
}
```

## 🚀 Scaling Guide

### Adding New Feature

```bash
# Create feature structure
src/features/auth/
├── api.ts           # API calls
├── hooks.ts         # Custom hooks
└── page.tsx         # Component

# Create types
src/types/auth/
├── auth.ts
├── request.ts
├── response.ts
└── index.ts
```

### Adding New Shared Component

```bash
# Add to shared
src/shared/components/ui/
├── button.tsx       # Existing
├── input.tsx        # New
└── card.tsx         # New
```

### Adding New Utility

```bash
# Add to shared utils
src/shared/utils/
├── cn.ts            # Existing
├── validator.ts     # New
└── formatter.ts     # New
```

## 🔗 Path Aliases

Configure `tsconfig.json` untuk clean imports:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

## 📊 Dependencies Flow

```
Features
  ↓
Shared (Components, Utils, Libs)
  ↓
Types (Global Type Definitions)
  ↓
External Packages (React, TailwindCSS, etc)
```

**Golden Rule:**

- ✅ Features dapat import dari Shared dan Types
- ✅ Shared dapat import dari Types
- ✅ Types adalah independent
- ❌ Features TIDAK boleh import dari Features lain
- ❌ Shared TIDAK boleh import dari Features

## 💡 Example: Adding Product Feature

### Step 1: Create Types

```typescript
// src/types/product/product.ts
export interface Product {
  id: string;
  name: string;
}

// src/types/product/request.ts
export interface CreateProductRequest {
  name: string;
}

// src/types/product/index.ts (barrel export)
export type * from "./product";
export type * from "./request";
```

### Step 2: Create API

```typescript
// src/features/products/api.ts
import { api } from "@/shared/libs/api/axios";
import type { Product, CreateProductRequest } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  return res.data;
}

export async function createProduct(payload: CreateProductRequest): Promise<Product> {
  const res = await api.post("/products", payload);
  return res.data;
}
```

### Step 3: Create Hooks

```typescript
// src/features/products/hooks.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProducts, createProduct } from "./api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
  });
}
```

### Step 4: Create Component

```typescript
// src/features/products/page.tsx
import Header from "@/shared/components/layout/Header";
import { useProducts, useCreateProduct } from "./hooks";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const { data: products } = useProducts();
  const createMut = useCreateProduct();

  return (
    <div>
      <Header />
      {/* Product list */}
    </div>
  );
}
```

---

**Happy Coding! 🚀**
