# 📚 Documentation Index

Semua dokumentasi untuk React TS Starter Kit tersedia di folder `/public/doc/`

## 🎯 Start Here

### 🆕 Dokumentasi Baru di Phase 1 ✅

Semua dokumentasi telah dipindahkan ke `/public/doc/` untuk kemudahan akses dan maintenance:

| File | Tujuan | Waktu Baca |
|------|--------|-----------|
| **[INDEX.md](./public/doc/INDEX.md)** | 📌 **START HERE** - Navigation hub untuk semua docs | 5 min |
| **[QUICK_REFERENCE.md](./public/doc/QUICK_REFERENCE.md)** | ⚡ Cheat sheet untuk developers | 5 min |
| [ARCHITECTURE.md](./public/doc/ARCHITECTURE.md) | 📐 Complete architecture guide | 15 min |
| [ARCHITECTURE_ADJUSTMENTS.md](./public/doc/ARCHITECTURE_ADJUSTMENTS.md) | 🛣️ Roadmap & phase planning | 20 min |
| [CONFIG_HOOKS_GUIDE.md](./public/doc/CONFIG_HOOKS_GUIDE.md) | 🔧 Config & hooks implementation guide | 30 min |
| [FEATURE_CONSTANTS_GUIDE.md](./public/doc/FEATURE_CONSTANTS_GUIDE.md) | 📋 Feature constants pattern reference | 25 min |

---

## 🚀 Quick Navigation by Role

### 👨‍💻 Developer Baru?
1. Baca [`INDEX.md`](./public/doc/INDEX.md) untuk overview
2. Baca [`ARCHITECTURE.md`](./public/doc/ARCHITECTURE.md) untuk memahami struktur
3. Baca [`CONFIG_HOOKS_GUIDE.md`](./public/doc/CONFIG_HOOKS_GUIDE.md) untuk tools
4. Check [`QUICK_REFERENCE.md`](./public/doc/QUICK_REFERENCE.md) saat butuh

### 🚀 Membuat Feature Baru?
1. Check [`QUICK_REFERENCE.md`](./public/doc/QUICK_REFERENCE.md)
2. Baca [`FEATURE_CONSTANTS_GUIDE.md`](./public/doc/FEATURE_CONSTANTS_GUIDE.md)
3. Follow patterns dari examples

### 🏗️ Tech Lead / Architect?
1. Baca [`ARCHITECTURE_ADJUSTMENTS.md`](./public/doc/ARCHITECTURE_ADJUSTMENTS.md) untuk roadmap
2. Baca [`ARCHITECTURE.md`](./public/doc/ARCHITECTURE.md) untuk full guide
3. Review phase planning

---

## 📊 Phase 1 Implementation Status

### ✅ COMPLETED

**Config Folder** (`src/config/`)
- ✅ api.ts - API endpoints, retry config, cache settings
- ✅ app.ts - App settings, features, validation
- ✅ constants.ts - HTTP status, messages, delays, durations
- ✅ index.ts - Barrel export

**Shared Hooks** (`src/shared/hooks/`)
- ✅ useLocalStorage - localStorage state sync
- ✅ useDebounce - Debounce function calls
- ✅ useThrottle - Throttle function calls
- ✅ useAsync - Async operation state management
- ✅ usePrevious - Track previous value
- ✅ useMediaQuery - Media query detection
- ✅ index.ts - Barrel export

**Feature Constants** (`src/features/{feature}/constants.ts`)
- ✅ products/constants.ts - Product domain constants
- ✅ home/constants.ts - Home domain constants

**Documentation** (`public/doc/`)
- ✅ INDEX.md - Navigation hub
- ✅ QUICK_REFERENCE.md - Developer cheat sheet
- ✅ ARCHITECTURE.md - Main guide (updated with Feature Constants)
- ✅ ARCHITECTURE_ADJUSTMENTS.md - Roadmap & phases
- ✅ CONFIG_HOOKS_GUIDE.md - Implementation guide
- ✅ FEATURE_CONSTANTS_GUIDE.md - Pattern reference

### ⏳ PLANNED (Phase 2)
- Guards folder (ProtectedRoute, AuthGuard)
- Error handling layer (AppError, ErrorBoundary)
- Feature components structure

### ⏳ PLANNED (Phase 3)
- Contexts folder (optional)
- Services layer (optional)
- Zustand stores (optional)

---

## 📍 File Locations

```
project-root/
├── public/doc/                          # 📚 ALL DOCUMENTATION HERE
│   ├── INDEX.md                        # Navigation hub
│   ├── QUICK_REFERENCE.md              # Cheat sheet
│   ├── ARCHITECTURE.md                 # Main guide
│   ├── ARCHITECTURE_ADJUSTMENTS.md     # Roadmap
│   ├── CONFIG_HOOKS_GUIDE.md           # Config & hooks
│   └── FEATURE_CONSTANTS_GUIDE.md      # Feature constants
│
└── src/
    ├── config/                          # Configuration files (✅ IMPLEMENTED)
    │   ├── api.ts
    │   ├── app.ts
    │   ├── constants.ts
    │   └── index.ts
    │
    ├── features/
    │   ├── products/
    │   │   └── constants.ts             # (✅ IMPLEMENTED)
    │   └── home/
    │       └── constants.ts             # (✅ IMPLEMENTED)
    │
    └── shared/hooks/                    # Custom hooks (✅ IMPLEMENTED)
        ├── useLocalStorage.ts
        ├── useDebounce.ts
        ├── useThrottle.ts
        ├── useAsync.ts
        ├── usePrevious.ts
        ├── useMediaQuery.ts
        └── index.ts
```

---

## ✨ What's New in Phase 1

### Config Folder
Centralized configuration untuk API, app settings, dan global constants:
```typescript
import { API_CONFIG, APP_CONFIG } from "@/config";
import { HTTP_STATUS, ERROR_MESSAGES, DELAYS } from "@/config/constants";
```

### Shared Hooks
6 custom hooks untuk common patterns:
```typescript
import { 
  useLocalStorage, useDebounce, useThrottle, 
  useAsync, usePrevious, useMediaQuery 
} from "@/shared/hooks";
```

### Feature Constants
Type-safe constants per feature module:
```typescript
import { PRODUCT_LIMITS, PRODUCT_STATUS } from "@/features/products/constants";
import { HOME_SECTIONS, HOME_NAVIGATION } from "@/features/home/constants";
```

---

## 📋 Integration Checklist

### Phase 1 Integration Tasks
- [ ] Read all documentation (INDEX.md → QUICK_REFERENCE.md)
- [ ] Update axios to use `API_CONFIG` from config
- [ ] Add `useLocalStorage` to theme toggle for persistence
- [ ] Add `useDebounce` to search components
- [ ] Add `useMediaQuery` to responsive layouts
- [ ] Verify no TypeScript errors: `npm run type-check`
- [ ] Verify no lint warnings: `npm run lint`
- [ ] Verify build succeeds: `npm run build`

### Next Steps (Phase 2)
- Create guards folder
- Implement error handling layer
- Add feature components structure

---

## 💡 Quick Examples

### Using Config
```typescript
import { API_CONFIG } from "@/config";
const endpoint = API_CONFIG.ENDPOINTS.PRODUCTS; // "/products"
```

### Using Hooks
```typescript
import { useLocalStorage, useDebounce } from "@/shared/hooks";

// Persistent state
const [theme, setTheme] = useLocalStorage("theme", "light");

// Debounced search
const search = useDebounce(handleSearch, 300);
```

### Using Feature Constants
```typescript
import { PRODUCT_LIMITS, PRODUCT_STATUS } from "@/features/products/constants";

if (name.length < PRODUCT_LIMITS.NAME_MIN_LENGTH) {
  throw new Error("Name too short");
}
```

---

## 📞 Questions?

- **Architecture & Structure?** → Read [`ARCHITECTURE.md`](./public/doc/ARCHITECTURE.md)
- **How to use Config/Hooks?** → Read [`CONFIG_HOOKS_GUIDE.md`](./public/doc/CONFIG_HOOKS_GUIDE.md)
- **Feature Constants pattern?** → Read [`FEATURE_CONSTANTS_GUIDE.md`](./public/doc/FEATURE_CONSTANTS_GUIDE.md)
- **Implementation status?** → Read [`ARCHITECTURE_ADJUSTMENTS.md`](./public/doc/ARCHITECTURE_ADJUSTMENTS.md)
- **Need quick reference?** → Check [`QUICK_REFERENCE.md`](./public/doc/QUICK_REFERENCE.md)

---

## 🔗 Documentation Links

All documentation is in `/public/doc/`:

👉 **[Start with INDEX.md](./public/doc/INDEX.md)**

---

*Last Updated: December 6, 2025*
*Phase 1 ✅ Complete - Config, Hooks, Feature Constants, Full Documentation*
