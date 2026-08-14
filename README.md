# ai-kit

React components for AI product UIs — prompt boxes, thinking indicators,
approval cards, and more. A pnpm + Turborepo monorepo.

## Structure

```
ai-kit/
├── apps/
│   └── docs/                  # Next.js documentation site
│       └── app/
│           ├── page.tsx       # landing page listing all components
│           └── components/
│               ├── prompt-box/page.tsx
│               ├── thinking/page.tsx
│               └── approval-card/page.tsx
├── packages/
│   └── react/                 # the published package: @inaicode/react
│       └── src/
│           ├── components/
│           │   ├── PromptBox/
│           │   ├── Thinking/
│           │   └── ApprovalCard/
│           ├── lib/cn.ts
│           └── index.ts       # public API
├── package.json                # workspace root
├── pnpm-workspace.yaml
└── turbo.json
```

## Components included

- **`PromptBox`** — chat input, auto-resizing textarea, Enter to submit
- **`Thinking`** — animated "AI is thinking" dots indicator
- **`ApprovalCard`** — approve/reject card for AI-proposed actions

## Setup

```bash
pnpm install
```

`apps/docs` depends on `@ai-kit/react` via `"workspace:*"` in its
`package.json` — pnpm automatically links it to `packages/react` locally,
no `npm link` needed inside the monorepo.

## Development

```bash
pnpm dev      # runs dev in all apps/packages in parallel (via turbo)
pnpm build    # builds all apps/packages, respecting dependency order
```

Turborepo reads `turbo.json` to know that `apps/docs`'s build depends on
`packages/react`'s build finishing first (`"dependsOn": ["^build"]`), so
`pnpm build` always builds the package before the docs site.

To work on just the docs site:
```bash
pnpm --filter docs dev
```

To work on just the component package:
```bash
pnpm --filter @ai-kit/react dev
```

## Adding a new component

1. `mkdir packages/react/src/components/YourComponent`
2. Add `YourComponent.tsx` + `index.ts` (same shape as `PromptBox/`)
3. Add `export * from "./components/YourComponent";` to `packages/react/src/index.ts`
4. `pnpm --filter @ai-kit/react build`
5. Add a docs page: `apps/docs/app/components/your-component/page.tsx`
6. Add it to the list in `apps/docs/app/page.tsx`

## Publishing `@ai-kit/react` to npm

The package is scoped (`@ai-kit/react`), so the first publish needs
`--access public` (scoped packages default to private).

```bash
cd packages/react

# bump version (semver): patch | minor | major
pnpm version patch

# build + publish (prepublishOnly runs the build automatically)
pnpm publish --access public
```

If you haven't created the `@ai-kit` org on npm yet, do that first at
https://www.npmjs.com/org/create — or publish under your own npm username
scope (e.g. `@yourusername/react`) if you don't want an npm org.

After publishing, bump the docs site (or any external consumer) to the new version:

```bash
pnpm --filter docs add @ai-kit/react@latest
```

## Deploying the docs site

### Option A — GitHub Pages (free, static)

The docs site is configured for static export at:

**https://bharathS-web.github.io/ai-kit**

Setup (one-time):

1. Push this repo to GitHub as `ai-kit` under your account.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. That's it — `.github/workflows/deploy-docs.yml` builds and deploys
   automatically on every push to `main` that touches `apps/docs` or
   `packages/react`.

You can also trigger it manually from the **Actions** tab
("Run workflow") without needing a new commit.

**Static export limitations to know about:**
- No Next.js API routes or server actions (a pure component-docs site
  doesn't need these, so this is fine here).
- `next/image` optimization is disabled — images are served as-is via
  `unoptimized: true` in `next.config.mjs`.
- If you ever rename the repo, update `basePath`/`assetPrefix` in
  `apps/docs/next.config.mjs` to match.

To build the static export locally and check the `out/` folder before
pushing:
```bash
cd apps/docs
NODE_ENV=production pnpm build
npx serve out
```

### Option B — Vercel (supports full Next.js features)

Import the repo in Vercel with:
- **Root Directory**: `apps/docs`
- **Framework Preset**: Next.js

Vercel + Turborepo auto-detects the monorepo and only rebuilds what changed.
Unlike GitHub Pages, this supports SSR/ISR/API routes if you need them later
— but for a static docs site, GitHub Pages (Option A) is simpler and free
without needing a Vercel account.
