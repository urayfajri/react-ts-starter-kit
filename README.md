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
