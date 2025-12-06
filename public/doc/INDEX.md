# Documentation Index

Panduan lengkap untuk mengakses semua dokumentasi arsitektur dan implementasi React TS Starter Kit.

## 📚 Available Documentation

### 1. **ARCHITECTURE.md** - Main Architecture Guide

Panduan lengkap struktur arsitektur modular React TS Starter Kit.

**Isi:**

- 📁 Folder structure dengan penjelasan tiap folder
- 🎯 Architecture principles (Feature-first, Separation of concerns, Centralized types, etc)
- 📦 Module communication patterns
- 🔄 Data flow diagram
- 💡 Best practices untuk feature development

**Untuk siapa:** Semua developer, terutama yang baru join project

**Waktu baca:** ~15 menit

[📖 Baca ARCHITECTURE.md](./ARCHITECTURE.md)

---

### 2. **ARCHITECTURE_ADJUSTMENTS.md** - Improvement Recommendations

Dokumentasi lengkap tentang 8 rekomendasi penyesuaian arsitektur dan status implementasinya.

**Status Implementasi:**

- ✅ Phase 1 - COMPLETED
  - Config Folder (api.ts, app.ts, constants.ts)
  - Shared Hooks (6 custom hooks)
  - Feature Constants (Product, Home)
- ⏳ Phase 2 - PLANNED
  - Guards folder (ProtectedRoute, AuthGuard)
  - Error handling layer
  - Feature components structure
- ⏳ Phase 3 - PLANNED
  - Contexts folder
  - Services layer
  - Zustand stores

**Isi:**

- Penjelasan tiap adjustment dengan benefit
- Status implementasi dengan checklist
- Recommended structure untuk tiap phase
- Timeline dan prioritas

**Untuk siapa:** Tech leads, architects, project managers

**Waktu baca:** ~20 menit

[📖 Baca ARCHITECTURE_ADJUSTMENTS.md](./ARCHITECTURE_ADJUSTMENTS.md)

---

### 3. **CONFIG_HOOKS_GUIDE.md** - Config & Hooks Integration

Panduan lengkap untuk menggunakan Config Folder dan Shared Hooks yang sudah diimplementasi.

**Isi:**

- Config Folder explanation (api.ts, app.ts, constants.ts)
- Shared Hooks API reference (6 hooks)
- Usage examples untuk setiap hook
- Integration checklist (langkah demi langkah)
- Common integration patterns
- Best practices

**Untuk siapa:** Semua developer yang ingin menggunakan config dan hooks

**Waktu baca:** ~30 menit (reference guide)

**Quick Start:**

1. Import dari config: `import { API_CONFIG, APP_CONFIG } from "@/config"`
2. Import hooks: `import { useLocalStorage, useDebounce, ... } from "@/shared/hooks"`
3. Follow examples di guide ini

[📖 Baca CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md)

---

### 4. **FEATURE_CONSTANTS_GUIDE.md** - Feature Constants Pattern

Panduan lengkap untuk membuat dan menggunakan Feature Constants per feature module.

**Isi:**

- Overview & benefits
- Global vs Feature constants
- Files created (products, home)
- Usage examples (validation, filtering, sorting, caching, etc)
- Best practices
- Migration guide untuk existing features
- Integration checklist

**Untuk siapa:** Semua developer membuat feature baru atau refactor existing

**Waktu baca:** ~25 menit (reference guide)

**Quick Start:**

1. Buat `src/features/{feature}/constants.ts`
2. Define `as const` objects (status, limits, messages, etc)
3. Export type utilities
4. Import dan gunakan di component/api

[📖 Baca FEATURE_CONSTANTS_GUIDE.md](./FEATURE_CONSTANTS_GUIDE.md)

---

## 🎯 Quick Navigation by Use Case

### Saya developer baru, mana yang harus dibaca?

1. ✅ [ARCHITECTURE.md](./ARCHITECTURE.md) - Mengerti struktur project
2. ✅ [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) - Mengerti tools yang tersedia
3. ✅ [FEATURE_CONSTANTS_GUIDE.md](./FEATURE_CONSTANTS_GUIDE.md) - Mengerti pattern untuk feature baru

**Total time:** ~60 menit

### Saya ingin membuat feature baru

1. ✅ [ARCHITECTURE.md](./ARCHITECTURE.md) - Section "Feature Development"
2. ✅ [FEATURE_CONSTANTS_GUIDE.md](./FEATURE_CONSTANTS_GUIDE.md) - Feature Constants pattern
3. ✅ [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) - Gunakan config dan hooks

### Saya ingin menggunakan Config dan Hooks

1. ✅ [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) - Complete reference
2. ✅ Lihat section "Integration Checklist" untuk langkah demi langkah

### Saya tech lead / architect

1. ✅ [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete architecture overview
2. ✅ [ARCHITECTURE_ADJUSTMENTS.md](./ARCHITECTURE_ADJUSTMENTS.md) - Phase planning dan roadmap
3. ✅ [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) & [FEATURE_CONSTANTS_GUIDE.md](./FEATURE_CONSTANTS_GUIDE.md) - Implementation details

### Saya ingin refactor existing code

1. ✅ [FEATURE_CONSTANTS_GUIDE.md](./FEATURE_CONSTANTS_GUIDE.md) - Section "Migration Guide"
2. ✅ [CONFIG_HOOKS_GUIDE.md](./CONFIG_HOOKS_GUIDE.md) - Gunakan existing config/hooks
3. ✅ [ARCHITECTURE.md](./ARCHITECTURE.md) - Follow architecture principles

---

## 📋 Key Concepts Summary

### Config Folder (`src/config/`)

```
api.ts         → API base URL, endpoints, retry config, cache settings
app.ts         → App settings, features, validation rules, pagination
constants.ts   → HTTP status, error messages, delays, durations
index.ts       → Barrel export
```

### Shared Hooks (`src/shared/hooks/`)

```
useLocalStorage    → Sync React state dengan localStorage
useDebounce        → Debounce function calls (search, input)
useThrottle        → Throttle function calls (scroll, resize)
useAsync           → Manage async operation state (loading, error, data)
usePrevious        → Track previous value across renders
useMediaQuery      → Detect media query matches untuk responsive design
index.ts           → Barrel export
```

### Feature Constants (`src/features/{feature}/constants.ts`)

```
LIMITS             → Validation constraints (min/max length, price range)
STATUS             → Enum values (active, inactive, archived)
SORT               → Sort options (newest, oldest, name-asc, etc)
FILTERS            → Filter options (all, active, inactive, etc)
MESSAGES           → Domain-specific messages (success, error)
CACHE              → Cache durations per endpoint
TIMEOUTS           → API timeout, debounce/throttle delays
UI                 → UI-specific constants (skeleton rows, grid items)
```

---

## ✅ Implementation Status

### Phase 1 ✅ COMPLETED

- [x] Config Folder (api.ts, app.ts, constants.ts, index.ts)
- [x] Shared Hooks (useLocalStorage, useDebounce, useThrottle, useAsync, usePrevious, useMediaQuery, index.ts)
- [x] Feature Constants (products/constants.ts, home/constants.ts)
- [x] Complete documentation (CONFIG_HOOKS_GUIDE.md, FEATURE_CONSTANTS_GUIDE.md)

**Files Created:** 14 code files + 2 guide documents

**Next:** Integrate config/hooks into existing components

### Phase 2 ⏳ PLANNED

- [ ] Guards folder (ProtectedRoute, AuthGuard)
- [ ] Error handling layer (AppError, ErrorBoundary)
- [ ] Feature components structure
- [ ] Feature stores (Zustand - optional)

**Priority:** HIGH (Important for production)

### Phase 3 ⏳ PLANNED

- [ ] Contexts folder (ThemeContext, AuthContext - optional)
- [ ] Services layer (StorageService, NotificationService)
- [ ] Advanced Zustand patterns
- [ ] Testing utilities

**Priority:** MEDIUM (Nice to have)

---

## 🚀 Getting Started Checklist

### ✅ For New Developers

- [ ] Read ARCHITECTURE.md (15 min)
- [ ] Read CONFIG_HOOKS_GUIDE.md (15 min)
- [ ] Read FEATURE_CONSTANTS_GUIDE.md (15 min)
- [ ] Run `npm run dev` dan explore the codebase
- [ ] Create your first feature following patterns
- [ ] Ask questions in team chat

### ✅ For Existing Developers

- [ ] Review CONFIG_HOOKS_GUIDE.md Integration Checklist
- [ ] Integrate config into axios instance
- [ ] Add useLocalStorage to theme toggle
- [ ] Add useDebounce/useMediaQuery to existing components
- [ ] Refactor magic strings into feature constants

### ✅ For Feature Development

- [ ] Create `src/features/{feature}/` folder
- [ ] Create `page.tsx`, `api.ts`, `hooks.ts`, `constants.ts`
- [ ] Create types in `src/types/{feature}/`
- [ ] Follow patterns di ARCHITECTURE.md
- [ ] Use config/hooks dari shared
- [ ] Add tests di `__tests__/` folder

---

## 📞 Support & Questions

Jika ada pertanyaan tentang:

- **Architecture & Structure** → Baca ARCHITECTURE.md
- **Config & Hooks Usage** → Baca CONFIG_HOOKS_GUIDE.md
- **Feature Constants** → Baca FEATURE_CONSTANTS_GUIDE.md
- **Implementation Progress** → Baca ARCHITECTURE_ADJUSTMENTS.md
- **Best Practices** → Lihat masing-masing guide

---

## 🔗 Related Files in Repository

- `src/config/` - Configuration files (api.ts, app.ts, constants.ts)
- `src/shared/hooks/` - Custom hooks (6 hooks)
- `src/features/products/constants.ts` - Product feature constants
- `src/features/home/constants.ts` - Home feature constants
- `CONTRIBUTING.md` - Contribution guidelines dengan conventional commits
- `README.md` - Project overview

---

## 📊 Documentation Version History

| Version | Date        | Status    | Changes                                             |
| ------- | ----------- | --------- | --------------------------------------------------- |
| 1.0     | Dec 6, 2025 | ✅ Latest | Phase 1 complete - Config, Hooks, Feature Constants |
| -       | -           | -         | -                                                   |

---

_Last Updated: December 6, 2025_
_Phase 1 ✅ Implementation Complete_

Untuk pertanyaan atau feedback, silakan buat issue atau discussion di repository.
