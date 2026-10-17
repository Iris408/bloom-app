# Bloom Product Roadmap

This document tracks Bloom's current development sequence and longer-term
product direction.

The detailed v3 product requirements live in:

`docs/V3_BETA_SPEC.md`

---

## Current Phase

Bloom is currently in:

**v2.2.x — Foundation / Persistence**

The objective is to make the existing full-stack architecture dependable
before implementing the larger v3 product and visual system.

Bloom already has a React frontend, FastAPI backend, JWT authentication and
PostgreSQL persistence for several major features.

v2.2.x is therefore focused on completing, connecting, isolating and
hardening the existing architecture rather than rebuilding persistence from
scratch.

---

## v2.2.x — Foundation / Persistence

Primary work:

- Fix remaining authenticated/local/demo data inconsistencies
- Use backend data as the authoritative source for authenticated users
- Fix Home task-stat backend sourcing
- Fix initial Home routine loading
- Fix local/demo Focus → Progress consistency
- Connect frontend ProfileSettings to existing backend endpoints
- Restore persisted accessibility/profile preferences after session restore
- Add authenticated Moments persistence
- Strengthen authenticated/demo data separation
- Add useful backend persistence/API tests
- Establish a reliable Alembic migration baseline
- Verify PostgreSQL production compatibility
- Establish and verify CI
- Complete lint/build/backend validation

This milestone will remain incremental and will not turn foundation work into an indefinite architecture rewrite.

---

## v2.3.x — v3 Design System and Dashboard

Implement the approved v3 visual foundation.

Primary work:

- Bloom v3 brand system
- Standard Bloom visual theme
- Light/dark appearance
- Desktop North Star
- Mobile North Star
- Dashboard hierarchy
- Active Routine presentation
- Focus preview
- Moments preview
- Gentle Progress preview
- Navigation refinements
- Core reusable UI components

---

## v2.4.x — Core Bloom Personal Experience

Refine the primary product features:

- Routines
- Routine steps
- Focus
- Moments
- Progress
- Personal profile
- Onboarding
- Core empty/loading/error states
- Cross-feature consistency

Bloom Personal is the production product being prepared for the initial beta.

---

## v2.5.x — Sprout Demo and Product Polish

Primary work:

- Sprout fictional-data demo
- Sprout visual treatment
- Guided demo flow
- Demo reset reliability
- Demo/account isolation
- Product-copy refinement
- Remaining core UX polish

Low Demand Mode and Oasis are not required for the initial beta.

---

## v2.6.x — Accessibility, Mobile and PWA Foundation

Primary work:

- Keyboard navigation
- Screen-reader structure
- Visible focus states
- Contrast validation
- Text-size controls
- OpenDyslexic support
- Additional readable-font option where appropriate
- Reduced-motion support
- High-contrast presentation
- Responsive mobile refinement
- Touch-target validation
- PWA manifest/icons
- Add-to-Home-Screen behaviour
- iOS Safari checks
- Offline/network error presentation

Advanced offline-first functionality, background synchronisation and web push
notifications are deferred.

---

## v2.7.x — Public Experience

Primary work:

- Public landing page
- Bloom Personal demo
- Sprout demo
- Login
- Registration
- Public/authenticated routing
- Metadata
- Open Graph/link previews
- Help
- Privacy
- Accessibility information

Bloom Education is not required for v3.0.0.

---

## v2.8.x — Beta Infrastructure

Primary work:

- Beta feedback workflow
- Founding Member status
- Account-management refinement
- Beta terms
- Feedback/report-problem flow
- Production monitoring/reliability checks
- Release documentation

Production Stripe billing is not required to begin the initial beta.

---

## v2.9.x — Beta Hardening

Primary work:

- End-to-end manual testing
- Backend/API tests
- Production migration verification
- Accessibility review
- Responsive/device testing
- Network/error testing
- Authentication/session testing
- Demo/account isolation verification
- Bug fixing
- Deployment verification
- Documentation
- Release candidate preparation

---

# v3.0.0 — Web Live Beta

Target cohort:

**Approximately 10 founding beta testers**

The initial beta focuses on:

- Bloom Personal
- Everyday Mode
- Routines
- Focus
- Moments
- Progress
- Core accessibility
- Responsive desktop/mobile web
- Sprout fictional-data demo
- Reliable authentication and persistence
- Real-world product feedback

The goal is to validate whether Bloom genuinely helps people organise,
focus, reflect and return after interruption without creating additional pressure.

---

# Post-v3 Beta Development

After v3.0.0, development becomes increasingly feedback-driven.

Potential Bloom Personal work includes:

- Low Demand Mode
- Oasis
- Chamomile & Oat
- Twilight Slate
- Terracotta Dust
- Violet Hour
- Improved Moments media
- Optional reminders
- Additional accessibility features
- Export tools
- Commercial pricing
- Stripe billing
- Further progress/reflection features

These should be prioritised using beta feedback rather than automatically
implemented in specification order.

---

# Native iOS Direction

Following validation of the core Bloom product, native iOS development may
become Bloom's next major platform investment.

Expected architecture:

React web
        \
         FastAPI
            |
        PostgreSQL
            |
         SwiftUI iOS

The existing FastAPI/PostgreSQL backend should serve both clients.

Long-term product direction:

**iOS**
Primary day-to-day Bloom experience.

**Mobile Web**
Complete and accessible web fallback.

**Desktop Web**
Full Bloom experience with particular strength in planning, routine setup,
reflection and account management.

**Public Web**
Landing pages, demos, documentation, support and account entry.

Potential native capabilities include:

- Native notifications
- Widgets
- Live Activities
- Improved Focus timer behaviour
- Haptics
- Native accessibility integration
- Camera/photo-library integration
- Offline/local functionality
- TestFlight distribution

Native development should begin after sufficient beta evidence exists to
justify the additional platform investment.

---

# Future Product Exploration

Future concepts remain intentionally outside the initial beta critical path.

These include:

- Bloom Education
- Production Sprout/child experiences
- Guardian/educator functionality
- Advanced offline capabilities
- Android
- Broader integrations
- Larger AI functionality

New ideas should enter the product backlog rather than automatically becoming
active development milestones.

---

# Development Principle

Bloom will continue to evolve steadily rather than being rushed toward a final state.

The working principle remains:

**Build → Understand → Test → Ship → Learn → Improve**

v3.0.0 is the beginning of real-world Bloom product validation, not the end
of Bloom development.