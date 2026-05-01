# Modular Architecture Guide

Satu panduan utama untuk struktur dan konvensi React TS Starter Kit—detail config, hooks, dan feature constants ada di bagian **Referensi cepat** di akhir dokumen ini.

## 📁 Folder Structure

```
src/
├── app/                          # Application core
│   ├── App.tsx                   # Root shell + router outlet
│   ├── AppLayout.tsx             # Layout area aplikasi (sidebar, protected)
│   ├── routes.tsx                # Route definitions
│   ├── providers.tsx             # Global providers (query, theme, auth, toasts)
│   ├── RouteFallback.tsx          # Suspense fallback untuk lazy routes
│   └── theme.tsx                 # Theme / design tokens helpers
│
├── config/                       # Centralized configuration
│   ├── api.ts                    # API base URL, endpoints, retry, cache
│   ├── app.ts                    # App settings, features, pagination, validation
│   ├── constants.ts              # HTTP status, messages, delays, durations
│   ├── env.ts                    # Validasi env klien (Zod); import dulu di main.tsx
│   └── index.ts                  # Barrel export
│
├── features/                     # Feature modules (domain-driven)
│   ├── home/
│   │   ├── page.tsx
│   │   └── constants.ts          # Feature-specific constants
│   │
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   │
│   ├── app-dashboard/
│   │   └── AppDashboardPage.tsx
│   │
│   └── products/
│       ├── page.tsx
│       ├── api.ts
│       ├── hooks.ts
│       ├── constants.ts
│       └── components/
│           ├── ProductCard.tsx
│           ├── ProductForm.tsx
│           └── index.ts
│
├── guards/                       # Route guards
│   ├── AuthGuard.ts              # Auth helpers (token, session)
│   ├── ProtectedRoute.tsx        # Wrapper: redirect jika belum login
│   └── index.ts
│
├── shared/
│   ├── components/
│   │   ├── layout/               # Header, sidebar, theme toggle, dll.
│   │   └── ui/                   # shadcn/ui primitives
│   ├── contexts/                 # React context (theme, auth, dll.)
│   ├── errors/                   # AppError, ErrorBoundary
│   ├── hooks/                    # useLocalStorage, useDebounce, useThrottle, dll.
│   ├── libs/
│   │   ├── queryClient.ts
│   │   └── api/
│   │       └── axios.ts          # Axios (memakai API_CONFIG)
│   ├── services/                 # Storage, notifications, dll.
│   ├── stores/                   # Zustand (contoh UI state)
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── cn.ts
│
├── types/                        # Global type definitions
│   ├── index.ts
│   └── product/
│       ├── product.ts
│       ├── request.ts
│       ├── response.ts
│       └── index.ts
│
├── main.tsx                      # Entry point
└── vite-env.d.ts                 # Vite env types

tests/
├── setup.ts                      # jest-dom matchers + lifecycle MSW
└── msw/
    ├── handlers.ts               # HTTP handlers (pakai URL dari API_CONFIG)
    └── server.ts                 # setupServer (MSW untuk Vitest/jsdom)

e2e/
└── smoke.spec.ts                 # Playwright smoke (Chromium)

playwright.config.ts              # Preview (`vite preview`) + proyek browser
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

- `shared/components/` - Layout & UI primitives
- `shared/contexts/` - Context providers yang dipakai lintas feature
- `shared/errors/` - Error types dan boundary
- `shared/hooks/` - Custom hooks (localStorage, debounce, throttle, async, previous, media query)
- `shared/libs/` - React Query client, Axios instance
- `shared/services/` - Abstraksi ke storage / API sampingan / notifikasi
- `shared/stores/` - Zustand store global kecil (mis. UI)
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
import { API_CONFIG } from "@/config";

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
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
      "@tests/*": ["tests/*"]
    }
  }
}
```

Impor umum memakai `@/` (mis. `@/features/...`). Untuk artefak tes bersama, gunakan `@tests/...` menuju folder `tests/` (handler MSW, dll.).

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

## Referensi cepat: config, hooks, feature constants

### Config

`main.tsx` mengimpor `@/config/env` terlebih dahulu supaya variabel tidak valid gagal cepat di startup. `API_CONFIG.BASE_URL` memakai `clientEnv.VITE_API_URL` (optional URL) atau fallback default.

```typescript
import { API_CONFIG, APP_CONFIG, clientEnv } from "@/config";
import { HTTP_STATUS, ERROR_MESSAGES, DELAYS } from "@/config/constants";

API_CONFIG.BASE_URL;
API_CONFIG.ENDPOINTS.PRODUCTS;
APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE;
```

### Shared hooks

```typescript
import {
  useLocalStorage,
  useDebounce,
  useThrottle,
  useAsync,
  usePrevious,
  useMediaQuery,
} from "@/shared/hooks";
```

### Feature constants

Per feature, tambahkan `constants.ts` dengan objek `as const` (limits, status, sort, messages, cache, dll.) dan export tipe turunan bila perlu:

```typescript
export const PRODUCT_STATUS = { ACTIVE: "active", INACTIVE: "inactive" } as const;
export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
```

Detail lihat contoh di `src/features/products/constants.ts` dan `src/features/home/constants.ts`.

---

## Testing singkat

- **Vitest** + `@testing-library/react`; setup global di `tests/setup.ts`.
- **MSW** (`msw`): handler di `tests/msw/handlers.ts`, server Node di `tests/msw/server.ts` — digunakan untuk Axios/React Query pada tes (mis. `fetchProducts`).
- **`npm run test:coverage`** memakai provider **v8**; output `./coverage/` (di-ignore git).
- **Playwright**: smoke **`e2e/smoke.spec.ts`**; `npm run build && npm run test:e2e` (`playwright.config.ts` menyalakan **`vite preview`**). Instal browser: **`npm run test:e2e:install`**.
- Alias impor tes: **`@tests/...`** → folder `tests/`.

---

## Deploy (ringkas)

Output produksi ada di **`dist/`** setelah `npm run build`. Variabel **`VITE_*`** harus ada **sebelum build** (embedding statis).

- **Hosting statis**: Vercel / Netlify / Cloudflare Pages / GitHub Pages — set **SPA fallback** (semua route → `index.html` dengan status 200 / rewrite).
- **Subpath** (mis. `https://user.github.io/repo/`): set Vite **`base`**, sesuaikan **`basename`** Router.
- Detail tabel dan perintah: lihat **`README.md`** bagian **Deploy**.

---

## Status implementasi (ringkas)

Starter ini sudah mencakup: config terpusat, **validasi env klien (Zod)**, **lazy route + Suspense**, hooks bersama, constants per feature, guards & rute terlindung, error boundary, context, services, store Zustand contoh, pola React Query + Axios, **mock HTTP (MSW)**, **coverage + a11y lint**, serta **smoke E2E (Playwright)**. Sesuaikan atau hapus modul yang tidak dipakai saat memulai proyek baru.

_Dokumentasi arsitektur dipusatkan di file ini; baca kode di `src/` sebagai sumber kebenaran kedua._
