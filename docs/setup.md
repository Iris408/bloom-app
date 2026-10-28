# Setup Guide

This document explains how to run Bloom locally.

## Repository layout

| Path | What it is | Status |
| --- | --- | --- |
| repository root (`package.json`, `src/`, `public/`, `vite.config.js`) | v2.2 frontend: React + Vite (JavaScript) | Production frontend, deployed by Vercel |
| `web/` | v3 frontend: Next.js + React + TypeScript (App Router) | In development, not deployed |
| `backend/` | FastAPI backend | Production backend |

The two frontends are independent. `web/` has its own `package.json`,
`package-lock.json` and `node_modules`, is not an npm workspace, and is not
installed by `npm install` at the root. Install and run each frontend from its
own folder.

## v2.2 frontend (repository root)

### Installation

Clone the repository:

```bash
git clone https://github.com/Iris408/bloom-app.git
cd bloom-app
```

Install dependencies:

```bash
npm install
```

### Run Locally

Start the Vite development server:

```bash
npm run dev
```

The app usually runs at:

```text
http://localhost:5173
```

### Build Check

Run:

```bash
npm run lint
npm run build
```

This confirms the frontend lints and builds successfully.

The frontend calls the backend at `VITE_API_BASE_URL` (default `http://127.0.0.1:8000`). Set it in `.env.local` if your backend runs elsewhere.

## v3 web app (`web/`)

```bash
cd web
npm install
npm run dev
```

The v3 app runs at `http://localhost:3000`, so it can run alongside the v2.2
app on `http://localhost:5173`. It does not call the backend yet and is marked
`noindex`.

Validate it from `web/`:

```bash
npm run lint
npm run typecheck   # generates Next.js route types, then runs tsc
npm test            # Vitest + React Testing Library
npm run build
```

See `web/README.md` for its route boundaries and isolation rules.

## Backend

The backend is a FastAPI app in `backend/`. Commands below run from that folder.

### Create the virtual environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
```

The `venv/` folder is not committed. If it was created in another location and the project was moved, scripts such as `venv/bin/uvicorn` keep pointing at the old path. Delete `venv/` and create it again with the commands above.

### Configure

```bash
cp .env.example .env
```

Set `SECRET_KEY` in `.env` to a long random value. The app does not start without it.

`DATABASE_URL` defaults to a local SQLite file (`sqlite:///./bloom.db`). Production uses PostgreSQL, for example `postgresql://user:password@host:5432/bloom`.

### Migrate the database

```bash
python -m alembic upgrade head
```

Run this before starting a new version of the backend, including on existing databases. It is safe on an empty database, on a database already managed by Alembic, and on an older database that was created by the app at startup without Alembic.

### Run

```bash
python -m uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`, with interactive docs at `/docs`.

### Test

```bash
python -m pytest
```

Tests use a temporary SQLite database and never touch `bloom.db`. To run them against PostgreSQL, point them at empty test databases:

```bash
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/bloom_test \
MIGRATION_TEST_DATABASE_URL=postgresql://user:password@localhost:5432/bloom_migrations \
python -m pytest
```

Both test databases are cleared by the tests, so never point them at real data.

## Continuous Integration

GitHub Actions (`.github/workflows/ci.yml`) runs on pushes to `main` and `feature/**` branches and on pull requests:

- Frontend (v2.2, repository root): install, lint, production build
- Backend: tests on SQLite and PostgreSQL, migration upgrade on a fresh PostgreSQL database, and a startup check
- Web v3 (`web/`): install, production-dependency audit (fails on high or critical), lint, typecheck, test, production build

Each job installs and validates its own app independently.

## Development Notes

Bloom is currently focused on the frontend public/protected app experience and v2.1.0 authentication preparation.

Current development areas include:

- Login flow
- Create account flow
- Logout flow
- Current user restoration on refresh
- Protected app access
- Demo mode separation from real account data
- Avatar saving
- Loading and error states