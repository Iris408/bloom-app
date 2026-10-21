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

## Rules

- Keep this app independent: its own `package.json` and `package-lock.json`,
  no npm workspaces, and no imports from the root `src/`.
- Do not add `next` or any `web/` dependency to the root `package.json`.
