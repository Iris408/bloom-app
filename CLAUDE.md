# CLAUDE.md — Bloom

This file contains repository-level instructions for AI-assisted development on Bloom.

For the current Bloom v3 product specification, read:

`docs/V3_BETA_SPEC.md`

The specification is the source of truth for approved v3 product behaviour, design direction, modes, themes, accessibility requirements and beta scope.

---

## Project

Bloom is an accessibility-first application for routines, focus, reflection and gentle progress.

Current development journey:

`v2.1.1 → v2.x milestones → v3.0.0 Live Beta`

v3 is a major product evolution, not a rebrand or framework rewrite.

The goal is to turn Bloom into a dependable live-beta product while preserving its calm, low-pressure product philosophy.

---

## Current Stack

### Frontend

- React
- Vite
- JavaScript / JSX
- Tailwind CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL for production
- SQLite fallback for local development
- Alembic migrations
- JWT authentication

### Infrastructure

- Docker where applicable
- GitHub Actions CI
- Environment-based configuration

Do not introduce another framework or backend stack without an explicit architectural decision.

In particular, do not independently migrate Bloom to:

- Next.js
- Vue
- Express
- TypeScript

These technologies may be evaluated separately in the future but are not part of the current v3 migration.

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

A friendly, playful demonstration experience.

For v3, Sprout is demo-only and uses fictional data.

Do not introduce real child accounts or child data.

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