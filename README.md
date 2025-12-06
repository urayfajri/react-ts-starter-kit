# React + TypeScript Starter Kit (Vite)

Production-ready starter with:

- React 19 + TypeScript strict
- Vite + path alias `@/`
- TailwindCSS + shadcn/ui design tokens
- Dark mode (class strategy + localStorage)
- React Router
- TanStack Query (query + mutation templates)
- Axios instance
- Zustand
- Sonner toast
- ESLint + Prettier
- Husky + lint-staged + commitlint
- Vitest + RTL
- Feature generator CLI
- OSS templates (LICENSE, CONTRIBUTING, PR/Issue templates)

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

## Demo

- Home: `/`
- Products demo (query + mutations): `/products`

## 🏗️ Architecture

This project follows a **modular, feature-first architecture** for scalability and maintainability.

### Folder Structure

```
src/
├── app/                    # Application core (routes, providers, theme)
├── features/               # Feature modules (home, products, auth, etc)
├── shared/                 # Shared components, utilities, libs
│   ├── components/         # Layout & UI components
│   ├── libs/               # React Query, Axios setup
│   ├── styles/             # Global styles
│   └── utils/              # Helper functions
├── types/                  # Global type definitions (centralized DTOs)
└── main.tsx               # Entry point
```

### Key Principles

- **Feature-First**: Each feature is self-contained with its own API, hooks, and components
- **Centralized Types**: All DTOs and type definitions in `src/types/`
- **No Circular Dependencies**: Features can only import from Shared & Types
- **Barrel Exports**: Clean imports using barrel exports (`index.ts`)

### Example: Product Feature

```
features/products/
├── api.ts         # API calls (import types from @/types/product)
├── hooks.ts       # Custom hooks (React Query, business logic)
└── page.tsx       # Component (uses hooks, UI components from shared)

types/product/
├── product.ts     # Entity types
├── request.ts     # Request DTOs
├── response.ts    # Response DTOs
└── index.ts       # Barrel export
```

For detailed architecture guide, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Generate a new feature

```bash
npm run gen:feature auth
```

## Add shadcn preset components

```bash
npm run shadcn:preset
```

## License

This project is licensed under the MIT License. See `LICENSE`.

## Attribution

This starter uses **shadcn/ui** components and **Radix UI Primitives**, both MIT licensed.

- shadcn/ui (MIT) — https://github.com/shadcn-ui/ui
- Radix Primitives (MIT) — https://github.com/radix-ui/primitives

You’re free to use and modify the code, but please keep the license notice intact.
