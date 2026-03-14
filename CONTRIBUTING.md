# Contributing Guide

Thanks for considering contributing! 🎉

## Getting Started

### 1. Setup

```bash
# Fork and clone
git clone https://github.com/YOUR-USERNAME/react-ts-starter-kit.git
cd react-ts-starter-kit

# Install dependencies
npm install

# Setup environment
cp .env.example .env
```

### 2. Create Feature Branch

```bash
git checkout -b feat/your-feature-name
```

Branch naming convention:

- `feat/` - New feature
- `fix/` - Bug fix
- `docs/` - Documentation
- `refactor/` - Code refactor
- `test/` - Tests

## Development

### Run Development Server

```bash
npm run dev
```

### Code Quality

Before pushing, ensure code quality:

```bash
npm run lint              # Check linting
npm run format            # Format code
npm run type-check        # TypeScript check
npm run test              # Run tests
```

Or run all at once:

```bash
npm run check-all         # lint + format + type-check + test
```

## Architecture Guidelines

### 📁 Project Structure

Please familiarize yourself with our modular architecture:

**See:** [ARCHITECTURE.md](./public/doc/ARCHITECTURE.md) for structure and recommendations

### Feature Development

When adding a new feature:

```bash
npm run gen:feature your-feature-name
```

This creates:

```
src/features/your-feature/
├── page.tsx          # Feature page
├── api.ts            # API calls
├── hooks.ts          # Custom hooks
└── components/       # Feature-specific components (optional)
```

### Types Management

- **Global types:** `src/types/{domain}/`
- **Feature types:** Reuse from `src/types/`, avoid local type files
- **DTOs:** Separate `request.ts` and `response.ts` files

**Example:**

```typescript
// ✅ Good: Import from global types
import type { Product, CreateProductRequest } from "@/types/product";

// ❌ Avoid: Local type definitions in features
// Don't create types.ts in feature folder
```

### Shared Components

Add reusable components to `src/shared/`:

```
src/shared/components/
├── ui/               # UI primitives (button, input, etc)
└── layout/           # Layout components (header, footer, etc)
```

**Rule:** Only add components here if used by multiple features.

### Code Style

#### TypeScript

- Use strict mode (enforced)
- Type all function parameters and returns
- Prefer `interface` for objects, `type` for unions/primitives

```typescript
// ✅ Good
interface Product {
  id: string;
  name: string;
}

function getProduct(id: string): Promise<Product> {
  // ...
}

// ❌ Avoid
function getProduct(id) {
  // ...
}
```

#### React

- Use functional components
- Use hooks for state management
- Keep components small and focused

```typescript
// ✅ Good: Small, focused component
export function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}

// ❌ Avoid: Large, doing too much
export function ProductCard({ product, onEdit, onDelete, ... }) {
  // 100+ lines of logic
}
```

#### File Naming

- Components: PascalCase (`Button.tsx`, `ProductCard.tsx`)
- Utils/Hooks: camelCase (`useProducts.ts`, `formatDate.ts`)
- Types: PascalCase (`Product.ts`, `request.ts` - filename based on content)

## Commit Convention

We use **Conventional Commits** for better commit history and automated versioning.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types & Rules

| Type         | Description   | Rule                                                | Example                                      |
| ------------ | ------------- | --------------------------------------------------- | -------------------------------------------- |
| **feat**     | New feature   | ✅ Use this when adding new functionality           | `feat(products): add product filter`         |
| **fix**      | Bug fix       | ✅ Use for bug fixes only, not refactoring          | `fix(header): correct theme toggle`          |
| **docs**     | Documentation | ✅ For README, ARCHITECTURE, guides updates         | `docs: update setup instructions`            |
| **style**    | Code style    | ✅ Formatting, semicolons, spaces (no logic change) | `style: fix indentation in button.tsx`       |
| **refactor** | Code refactor | ✅ Improve code without changing behavior           | `refactor(api): simplify error handling`     |
| **perf**     | Performance   | ✅ Performance improvements                         | `perf(query): optimize product list query`   |
| **test**     | Tests         | ✅ Add or update tests                              | `test(products): add useProducts hook tests` |
| **chore**    | Maintenance   | ✅ Tooling, dependencies, build updates             | `chore: update dependencies`                 |
| **ci**       | CI/CD         | ✅ CI/CD configuration changes                      | `ci: add github actions workflow`            |

### Scope Guidelines

Scope adalah optional tapi strongly recommended. Isinya adalah bagian kode yang diubah:

```
feat(scope): description
     ^^^^^
     |
     +-- Bagian mana yang diubah: products, header, auth, etc
```

**Common Scopes:**

- `products` - Product feature
- `home` - Home page
- `auth` - Authentication
- `header` - Header component
- `button` - Button component
- `api` - API setup
- `types` - Type definitions
- `hooks` - Custom hooks
- `shared` - Shared utilities

**Examples with scope:**

```bash
feat(products): add product filter
fix(header): correct alignment
docs(architecture): update folder structure
refactor(api): simplify error handling
test(hooks): add useProducts tests
```

### Subject Line Rules

1. **Use imperative mood** - "add feature" not "added feature"
2. **Don't capitalize first letter** - "add" not "Add"
3. **No period at end** - "add feature" not "add feature."
4. **Max 50 characters** - Be concise
5. **Be specific** - "add dark mode toggle" not "add feature"

```bash
# ✅ Good subjects
feat(button): add loading state
fix(header): correct responsive layout
docs: update contribution guidelines

# ❌ Bad subjects
feat(button): Added loading state        (past tense)
feat(button): ADD LOADING STATE          (uppercase)
feat(button): add loading state.         (period)
feat: update                              (too vague)
feat: implement a button loading state with spinner that shows when clicked (too long)
```

### Body & Footer

**Body** (optional but recommended):

- Explain WHAT and WHY, not HOW
- Wrap at 72 characters
- Separate from subject with blank line
- Use bullet points for multiple changes

**Footer** (optional):

- Link related issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Complete Examples

**Simple feature:**

```bash
git commit -m "feat(products): add product filter functionality"
```

**Feature with body:**

```bash
git commit -m "feat(auth): implement login flow

- Add login page component
- Add auth context provider
- Add protected route guard
- Store auth token in localStorage

Closes #123"
```

**Bug fix with details:**

```bash
git commit -m "fix(header): correct theme toggle alignment

The theme toggle was misaligned due to missing flex properties.
Added flex-center class to properly center the component.

Closes #456"
```

**Breaking change:**

```bash
git commit -m "refactor(api): change response format

BREAKING CHANGE: API response structure changed from
{ data: [...] } to { items: [...], total: 0 }"
```

**Multiple related changes:**

```bash
git commit -m "feat(products): enhance product management

- Add product filtering by category
- Add product search functionality
- Add sort options (newest, price, popularity)
- Update ProductList component

Closes #100, #101, #102"
```

### Commit Best Practices

✅ **DO:**

- Make atomic commits (one logical change per commit)
- Commit often during development
- Write descriptive, clear messages
- Reference issues when relevant
- Use present tense in subject

❌ **DON'T:**

- Mix multiple features in one commit
- Use vague messages like "fix stuff" or "update"
- Commit broken code
- Make huge commits that do everything
- Use past tense in subject

### Tools & Validation

**Husky + commitlint:**

- Installed and configured automatically
- Validates every commit message
- Rejects commits that don't follow convention

Example rejection:

```
⧗   input: feat Add product
✖   subject must not be empty
✖   subject may not be empty
```

Fix: Use correct format: `feat(products): add product`

## Pull Request Process

### Before Creating PR

1. ✅ Run `npm run check-all`
2. ✅ Write/update tests
3. ✅ Update documentation if needed
4. ✅ Rebase on main branch

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactor

## Related Issues

Closes #123

## Testing

- [ ] Added unit tests
- [ ] Added integration tests
- [ ] Manual testing done

## Checklist

- [ ] Code follows style guidelines
- [ ] Linting passes
- [ ] Types are correct
- [ ] Documentation updated
- [ ] Tests pass
```

### PR Rules

- Keep PRs small and focused (< 400 lines if possible)
- One feature per PR
- Add tests for new features
- Update docs if behavior changes
- Request review from maintainers

## Testing

### Run Tests

```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Writing Tests

- Test file location: `src/features/*/__tests__/`
- File naming: `*.test.ts` or `*.test.tsx`
- Use Vitest + React Testing Library

```typescript
// Example: src/features/products/__tests__/hooks.test.ts
import { renderHook, act } from "@testing-library/react";
import { useProducts } from "../hooks";

describe("useProducts", () => {
  it("should fetch products", async () => {
    const { result } = renderHook(() => useProducts());
    expect(result.current.isLoading).toBe(true);
  });
});
```

## Documentation

When making changes that affect user-facing behavior:

1. Update relevant documentation
2. Add code examples if applicable
3. Update ARCHITECTURE.md if structure changes
4. Add migration guide for breaking changes

## Questions?

- 📖 Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- 💬 Open a discussion or issue
- 📧 Contact maintainers

---

**Happy contributing! 🚀**
