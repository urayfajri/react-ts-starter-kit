# React + TypeScript Starter Kit (Vite)

[![CI](https://github.com/urayfajri/react-ts-starter-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/urayfajri/react-ts-starter-kit/actions/workflows/ci.yml)

Production-ready starter with:

- React 19 + TypeScript strict
- Vite + path alias `@/`
- TailwindCSS + shadcn/ui design tokens
- Dark mode (class strategy + localStorage)
- React Router
- TanStack Query (query + mutation templates)
- Axios + **AppError** (mapping terpusat), **Bearer** dari token, **401 → logout + redirect** (`UnauthorizedSessionSync`)
- **Route-level** `RouteFeatureErrorBoundary` (Suspense lazy + layout `/app`)
- **TanStack Query Devtools** hanya **`import.meta.env.DEV`**
- **Analisis bundle:** `npm run build:analyze`, lalu buka `dist/stats.html`
- Lazy route splitting (`React.lazy` + `Suspense`) for feature pages
- Client env validated with **Zod** (`VITE_API_URL` optional URL)
- Zustand
- Sonner toast
- ESLint + Prettier + **jsx-a11y** (recommended rules sebagai `warn`)
- Husky + lint-staged + commitlint
- Vitest + RTL + **MSW** (`tests/msw/`); laporan **`npm run test:coverage`** (provider v8)
- Smoke **E2E** dengan **Playwright** (`e2e/`, Chromium)
- Feature generator CLI
- OSS templates (LICENSE, CONTRIBUTING, PR/Issue templates)

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

## Demo routes

- Home: `/`
- Login / sign up: `/login`, `/signup`
- App shell (protected): `/app`
- Products demo inside app layout: `/app/products`

## Architecture

The repo uses a **feature-first** layout: `src/features/*` for domains, `src/shared/*` for reusable UI/libs/hooks, `src/config/*` for centralized settings, `src/types/*` for shared DTOs and entities.

**Full guide (single doc):** [public/doc/ARCHITECTURE.md](./public/doc/ARCHITECTURE.md)

## Bundle analysis

Jalankan `npm run build:analyze` (butuh shell dengan `ANALYZE=true`; di Windows bisa `set ANALYZE=true` lalu `npx vite build` setelah `tsc -b`). Buka **`dist/stats.html`** di browser untuk treemap gzip/brotli — dipakai untuk cek regressi ukuran bundle sebelum merge fitur besar.

## E2E (Playwright)

Smoke tests live in [`e2e/`](./e2e/) (Chromium). Config: [`playwright.config.ts`](./playwright.config.ts) — starts **`vite preview`** on `http://127.0.0.1:4173` (set `E2E_PORT` / `E2E_BASE_URL` if needed).

```bash
npx playwright install chromium   # first run (or: npm run test:e2e:install)
npm run build && npm run test:e2e
```

For UI mode: `npx playwright test --ui`.

## Deploy (static SPA)

`npm run build` writes **`dist/`** (HTML, JS, CSS). This is a client-only React app: **set all `VITE_*` variables in the hosting provider** (or CI) **before** the build so they are baked into the bundle.

| Platform | Notes |
| -------- | ----- |
| **Vercel** | Preset: Vite. Build: `npm run build`, output: `dist`. Add a **rewrite** so every path serves `index.html` (SPA fallback). |
| **Netlify** | Publish directory `dist`, build command `npm run build`. Use `_redirects` or `netlify.toml`: `/*` → `/index.html` with **200** (rewrite). |
| **Cloudflare Pages** | Build output `dist`; enable **SPA / fallback** to `index.html` in project settings. |
| **GitHub Pages** | Upload `dist` (e.g. `actions/upload-pages-artifact`). If the site is not at the domain root, set Vite **`base`** in `vite.config.ts` and pass a matching **`basename`** to `RouterProvider` in `App.tsx`. |

Preview production build locally: `npm run preview`.

## CI (GitHub Actions)

On push and pull requests to `main` or `master`, [.github/workflows/ci.yml](./.github/workflows/ci.yml) runs `npm ci`, **type-check**, **lint**, **Vitest + coverage**, **production build**, then installs **Playwright Chromium** and runs **`npm run test:e2e`**. Locally, **`npm run check-all`** matches most of that but **does not** run Playwright; use `npm run build && npm run test:e2e` before release if you want E2E parity with CI.

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
