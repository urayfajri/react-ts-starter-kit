# Contributing Guide

Thanks for considering contributing! 🎉

## Getting Started
1. Fork this repository
2. Clone your fork
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Development
Run dev:
```bash
npm run dev
```

Lint & format before pushing:
```bash
npm run lint
npm run format
npm run test
```

## Commit Convention
We use Conventional Commits:
- feat: new feature
- fix: bug fix
- docs: documentation changes
- refactor: refactor without behavior change
- chore: tooling/maintenance

Example:
```bash
git commit -m "feat(button): add loading state"
```

## Pull Request Rules
- Keep PRs focused and small
- Add/update tests if needed
- Update docs if behavior changes

## Code Style
- TypeScript strict
- Feature-based folders under `src/features`
- Shared UI under `src/shared/components/ui`
