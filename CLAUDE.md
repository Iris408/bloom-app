# CLAUDE.md — Bloom

This file contains repository-level instructions for AI-assisted development on Bloom.

For the current Bloom v3 product specification, read:

`docs/V3_BETA_SPEC.md`

The specification is the repository source of truth for approved v3 product behaviour and direction.

Approved technical architecture and later decisions are also tracked in Jira under the Bloom v3 Product & UX Foundation work.

Where an older repository document conflicts with a later explicitly approved Jira decision, the later approved decision takes precedence.

---

## Project

Bloom is an accessibility-first application for routines, focus, reflection and gentle progress.

Current development journey:

`v2.2.0 production baseline → v2.3/v3 foundation → v3.0.0-beta.1`

v3 is a major product evolution built incrementally from the stable v2.2 production baseline.

Approved framework and architecture migrations must be implemented in controlled Jira-scoped slices. Do not perform a blind rewrite of working Bloom functionality.

---

## Production Baseline and Approved v3 Target

### Current production baseline — v2.2.0

Frontend:

- React
- Vite
- JavaScript / JSX
- Tailwind CSS

Backend:

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL in production
- Alembic migrations
- Existing Bloom JWT/password authentication

Infrastructure:

- Vercel frontend
- Render backend
- Managed Render PostgreSQL
- GitHub Actions CI
- Environment-based configuration

The v2.2 production application is the stable migration baseline. Preserve working behaviour unless the active Jira ticket intentionally changes it.

### Approved v3 frontend target

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- Custom Bloom design system
- Selective Radix UI primitives
- React Hook Form + Zod
- TanStack Query
- Vitest + React Testing Library
- Playwright

### Approved v3 backend target

- Python
- FastAPI modular monolith
- Pydantic v2
- PostgreSQL
- SQLAlchemy 2 using async patterns where appropriate
- asyncpg
- Alembic
- Versioned REST API under `/api/v1`
- pytest + HTTPX

### Approved v3 platform boundaries

- Clerk for adult / guardian identity
- Bloom-owned Account, Adult Profile and Sprout Profile records
- AWS S3 for private user-generated media
- Render Cron Jobs for initial scheduled/background work
- Stripe for web payments
- StoreKit 2 for future native iOS purchases
- Sentry for application error tracking
- Vercel for Next.js
- Dockerised FastAPI on Render
- Managed PostgreSQL on Render
- GitHub Actions for CI

Do not replace these approved technologies or introduce additional major frameworks, databases, queues, state libraries or infrastructure without an explicit Jira architecture decision.

In particular, do not independently introduce:

- Vue
- Express
- GraphQL
- Redux
- microservices
- Redis / Celery
- Kubernetes
- ECS / EKS
- mandatory Terraform
- React Native
- Flutter
- Capacitor

Some of these may be reconsidered later if a concrete requirement justifies them.

---

## Repository Boundaries

The repository root is the current production v2.2 frontend.

`web/` is the independent v3 Next.js frontend. It is not part of the root app's dependency tree.

Never add v3 dependencies to the root `package.json`, or root dependencies to `web/package.json`.

Never import root `src/` code into `web/`.

Do not change the current production/Vercel boundary unless a later ticket explicitly authorises it.

---

## Development Principles

Work incrementally.

Prefer:

1. Inspect
2. Understand
3. Make one controlled change
4. Test
5. Review the diff
6. Commit
7. Continue

Do not perform broad speculative refactors.

Do not rewrite working functionality simply because another implementation might be cleaner.

Do not introduce features that are not part of the current milestone or specification.

When a task exposes unrelated technical debt, report it rather than automatically fixing it.

Preserve existing behaviour unless the requested change intentionally modifies it.

Every implementation change must stay within the active Jira ticket unless the user explicitly expands the scope.

---

## Commit Attribution

Do not add `Co-Authored-By`, `Co-authored-by`, `Claude-Session`, or other AI attribution trailers.

All commits use the configured Git author only.

---

## Product Principles

Bloom should remain:

- Calm
- Flexible
- Accessibility-first
- Low-pressure
- Supportive without being patronising
- Easy to return to after inactivity
- Mobile-friendly
- Clear without unnecessary cognitive load

Bloom must not introduce:

- Productivity streaks
- Usage streaks
- Competitive rankings
- Productivity scores
- Punishment for missed days
- Shame-based messaging
- Engagement pressure
- Artificial urgency

Progress should help users recognise activity without judging performance.

Celebrate wins of every size.

---

## Routine Philosophy

Routines are a primary Bloom feature.

Routine times are optional.

A routine step without a scheduled time must not be treated as less important or labelled "optional" merely because it has no time.

Avoid introducing unnecessary scheduling pressure.

---

## Bloom Modes

Approved v3 modes are:

### Everyday

The standard Bloom Personal experience.

### Low Demand

Reduces information density, choices, stimulation and cognitive demand.

This is behavioural UX, not simply another colour theme.

### Oasis

A calm space away from planning/productivity.

Oasis should avoid completion statistics, outstanding-task pressure and productivity language.

### Sprout

Sprout is Bloom's younger-user experience, managed through an authenticated adult / guardian account.

Sprout should remain friendly, calm, simple and low-pressure.

Approved identity boundaries:

- A Sprout profile is owned by a Bloom adult / guardian account.
- Sprout profiles do not have independent Clerk accounts.
- A child email address is not required.
- FastAPI enforces Sprout ownership and permissions server-side.
- Guardian-sensitive settings remain protected by authenticated adult authorization.
- A Guardian PIN may protect transitions out of Sprout mode as a UX barrier, but it is not the security boundary.

Sprout should not introduce scores, streaks, rankings, missed-day penalties or productivity pressure.

Do not collect unnecessary child information. Exact date of birth or other additional child data requires a concrete approved product or legal requirement.

---

## Themes

Approved colour themes:

- Standard Bloom
- Chamomile & Oat
- Twilight Slate
- Terracotta Dust
- Violet Hour

Themes control how Bloom looks.

Modes control how Bloom behaves.

Keep these concepts separate.

Dark mode and high contrast are presentation/accessibility controls rather than standalone custom themes.

---

## Brand

The official Bloom logo uses:

- A five-petal line flower
- Botanical multi-tone treatment for the standard Bloom identity
- Dark forest-green serif `Bloom` wordmark

The five-petal geometry is the canonical Bloom mark.

Theme/mode colour treatments may change the flower colours while preserving its geometry.

Sprout is the deliberate exception and may use its friendlier filled flower character.

`v3.0.0` and `Live Beta` labels are product/status UI elements and are not permanent parts of the core logo.

---

## Accessibility

Accessibility is a product requirement, not a final polish task.

Consider accessibility while implementing every feature.

Important areas include:

- Keyboard navigation
- Semantic HTML
- Screen-reader labels
- Visible focus states
- Colour contrast
- Text resizing
- Reduced motion
- OpenDyslexic support
- Additional readable font options where approved
- High contrast
- Touch