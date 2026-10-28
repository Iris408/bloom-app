# Bloom v3 web (foundation)

Isolated Next.js + React + TypeScript (App Router) foundation for Bloom v3.

It is not the live Bloom app. The v2.2 production frontend lives at the
repository root and is deployed separately; this folder does not change it.

## Run locally

```bash
cd web
npm install
npm run dev
```

The app runs at http://localhost:3000.

## Validate

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs the same commands in the `Web v3 (lint, typecheck, test, build)` job,
plus `npm audit --omit=dev --audit-level=high`.

## Route boundaries

| URL | Shells |
| --- | --- |
| `/` | public |
| `/demo` | public → demo |
| `/auth/sign-in` | auth |
| `/app` | app → adult |
| `/app/sprout/[profile]` | app → sprout (never adult) |

`app/layout.tsx` is the shared authenticated boundary. The adult shell lives in
the `app/(adult)` route group so Sprout routes never inherit it. `/app/sprout`
without a profile is intentionally not a route and returns 404. Everyday and
Low Demand will change presentation, not routes.

## Isolation

- Own `package.json` and `package-lock.json`; no npm workspaces; nothing from
  `web/` in the root `package.json`.
- No imports from the root `src/`.
- `next.config.ts` pins `turbopack.root` to `web/`, so packages resolve only
  from `web/node_modules`.
- The root v2 build ignores this folder: the root ESLint config ignores
  `web/**`, and `src/index.css` excludes it from Tailwind with
  `@source not "../web"`.
- Every response is `noindex, nofollow` (metadata and an `X-Robots-Tag` header).
- The current production frontend remains the root v2.2 app. BLOOM-27 does not
  change Vercel configuration or point production at `web/`.
