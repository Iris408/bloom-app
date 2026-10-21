# Bloom v3 Beta Specification

> **Status:** Approved product direction / implementation planning
> **Current stable release:** v2.2.0
> **Current development phase:** v2.3 / v3 Foundation
> **Public beta target:** v3.0.0-beta.1
>
> **Product principle:** Small steps. Steady routines. Room to grow.
>
> A visual task planner without streaks, pressure, or the feeling of falling behind.

Bloom v3 is the next production generation of Bloom.

It builds incrementally from the stable v2.2.0 production baseline while
introducing a new product shell, stronger production architecture, clearer
account/profile boundaries, expanded modes, Sprout, improved accessibility,
and a future-ready API for web and native clients.

v3 is not a blind rewrite.

Approved framework and architecture migrations must be implemented in
controlled Jira-scoped stages so that working Bloom functionality is preserved
wherever practical.

The objective is to create a cohesive, accessible and dependable product that
can support real users, meaningful beta feedback and continued production
development.

Implementation details may continue to be refined through dedicated Jira
tickets. Where an older document conflicts with a later explicitly approved
Jira decision, the later approved decision takes precedence.

---

# 1. Product Principles

Bloom should remain a calm and flexible space for planning, focusing,
reflecting and growing in a way that works for the individual user.

Bloom v3 must follow these principles:

- Accessibility is foundational.
- No productivity streaks.
- No usage streaks.
- No competitive rankings.
- No productivity scores.
- No punishment for inactivity.
- No task debt caused by missed days.
- No shame-based recovery messaging.
- No artificial urgency.
- No engagement pressure.
- Routine times remain optional.
- Progress informs rather than judges.
- Small wins are meaningful.
- Returning after inactivity should feel easy.
- Users should not be made to feel that they have failed.
- Information density should remain manageable.
- Important actions should remain easy to find.
- Users should have control over how Bloom looks and behaves.
- Mobile layouts must be intentionally designed rather than compressed desktop
  interfaces.
- Notifications and reminders should support the user rather than pressure
  them.

Return messaging should follow the tone of:

> **Welcome back. Start with today.**

and:

> **What would help right now?**

---

# 2. Bloom v3 Product Family

## Bloom Personal

Bloom Personal is the core production product.

It includes:

- Everyday Mode
- Low Demand Mode
- Oasis
- Routines
- Tasks
- Focus
- Moments
- Progress
- Personalisation
- Accessibility controls
- Account/profile management
- Responsive desktop and mobile web experiences
- PWA/installable web support
- Future native iOS access through the same Bloom API

Bloom Personal remains the central product throughout the v3 generation.

---

## Sprout

Sprout is Bloom's younger-user experience.

It is not simply a demonstration theme and is not an independent child account
system.

A Sprout profile belongs to an authenticated adult / guardian Bloom account.

Initial identity rules:

- An adult / guardian authenticates through Bloom's adult identity flow.
- A Bloom account may own multiple Sprout profiles.
- A Sprout profile does not have its own Clerk account.
- A child email address is not required.
- Exact child date of birth should not be collected unless a concrete product
  or legal requirement justifies it.
- FastAPI enforces Sprout ownership and permissions server-side.
- Guardian-sensitive settings require authenticated adult authorization.
- A Guardian PIN may act as a practical barrier when leaving Sprout mode but is
  not the underlying security boundary.
- Multi-guardian household support is deferred beyond the initial v3 scope.

Sprout should remain:

- Calm
- Friendly
- Playful
- Visually clear
- Low-pressure
- Accessible
- Free from scores, rankings and streaks

Sprout may use the Bud companion and its own friendlier visual treatment while
remaining recognisably part of Bloom.

---

## Bloom Education

Bloom Education is not part of the initial v3 production scope.

Education remains a future product/research direction that may build on Bloom,
Sprout and future guardian/learner relationships after the core consumer
product is stable.

Any production education release involving children, schools or educational
organisations requires separate product, privacy, safeguarding, security and
legal review.

Bloom Education must not block Bloom v3.

---

# 3. Bloom Modes

Bloom v3 recognises four approved experience modes:

- Everyday
- Low Demand
- Oasis
- Sprout

Modes control how Bloom behaves.

They are separate from visual themes and accessibility presentation settings.

---

## Everyday

Everyday is the standard Bloom Personal experience.

It provides the complete day-to-day planning, routine, focus, reflection and
progress experience.

Everyday should remain:

- Clear
- Flexible
- Calm
- Full-featured
- Easy to return to

---

## Low Demand

Low Demand reduces cognitive demand without removing the user's agency.

It may reduce:

- Visible choices
- Information density
- Visual stimulation
- Optional secondary content
- Decision-heavy interactions

It may provide:

- Simplified wording
- Reduced information hierarchy
- Shortened routines where explicitly chosen
- Reduced motion
- Easier access to immediate next actions

Low Demand is behavioural UX, not merely a colour theme.

---

## Oasis

Oasis is a deliberate rest/recovery space inside Bloom.

Its default state should allow the user to simply remain there without needing
to complete anything.

Oasis should support experiences such as:

- Calm visual space
- Quiet timer where appropriate
- Grounding or breathing tools
- Optional ambient sound
- Optional Moment creation
- Easy return to Bloom

Oasis must not display:

- Completion percentages
- Outstanding task pressure
- Productivity scores
- Streaks
- Missed-task warnings
- Pressure to begin another activity

Oasis should support the principle:

> **Just stay here.**

---

## Sprout

Sprout provides a simpler, friendlier Bloom experience for younger users.

Core Sprout direction includes:

- Bud companion
- Simplified navigation
- No scores
- No streaks
- No productivity pressure
- Gentle flower-growth progress
- Lower progress thresholds
- Optional numeric progress view controlled through guardian settings
- Guardian controls for selected features
- Simplified Focus durations
- Reduced-motion support

Primary Sprout concepts include:

- My Steps
- My Focus Time
- Oasis
- Moments where enabled
- My Garden / Progress where enabled

Guardian-controlled features may include:

- Progress / My Garden visibility
- Moments
- Available avatars
- Selected Sprout preferences

Sprout Focus durations should include:

- 2 minutes
- 5 minutes
- 10 minutes
- Choose

Sprout does not require a dedicated rest timer.

Bud may have states including:

- Calm
- Happy
- Sleepy
- Growing

Bud supports the experience but must not become the interface itself.

---

# 4. Public, Authentication and Account Structure

Bloom v3 clearly separates public, authenticated, demo and Sprout experiences.

```text
Bloom public website
        │
        ├── Product information
        ├── Public demo
        ├── Sign in
        └── Register
                │
                ▼
          Bloom Account
                │
        ┌───────┴────────┐
        ▼                ▼
 Adult Profile      Sprout Profile(s)
```

The public experience should allow people to understand Bloom without creating
an account.

Demo data and authenticated data must remain isolated.

---

## Adult / Guardian Authentication

Adult and guardian authentication uses Clerk.

Bloom does not store adult passwords.

The backend verifies the identity provider's token/session and resolves it to a
Bloom-owned account.

Identity and authorization remain separate concepts:

> Clerk establishes who the adult is.

> Bloom determines what that account is allowed to access.

---

## Bloom Account and Profiles

Bloom owns its application records in PostgreSQL.

The core distinction is:

### Account

Represents:

- Authenticated ownership
- Security boundary
- Billing/entitlements
- Account-level configuration

### Adult Profile

Represents the adult user's Bloom experience.

### Sprout Profile

Represents a younger user's Bloom experience owned by the adult / guardian
account.

FastAPI is authoritative for all ownership and permission checks.

The frontend must never grant access based only on client-side state.

---

## Guardian Security Boundary

Guardian-sensitive operations may include:

- Account/security settings
- Billing
- Profile deletion
- Data export/deletion
- Sprout guardian controls
- Sensitive account changes

These require authenticated adult authorization.

Where appropriate, sensitive operations may require step-up or re-authentication.

A Guardian PIN may be used as a practical UX barrier for moving out of the
Sprout experience, but it is not equivalent to account authentication.

---

# 5. Core Bloom Personal Features

Core Bloom Personal features include:

- Home
- Routines
- Tasks
- Focus
- Moments
- Progress
- Profile
- Accessibility
- Personalisation
- Account management
- Notifications/reminders where implemented

Each major feature should support:

- Loading states
- Empty states
- Success states
- Recoverable error states
- Permission boundaries
- Responsive layouts
- Accessibility requirements

---

# 6. Routines and Tasks

Routines remain one of Bloom's primary experiences.

Users should be able to:

- Create routines
- Edit routines
- Delete routines
- Add steps
- Reorder steps where supported
- Complete individual steps
- Return to incomplete routines
- View gentle progress
- Use shortened versions where explicitly supported
- Create and manage ordinary tasks

---

## Optional Times

Routine and task times remain optional.

A routine step without a scheduled time must not be treated as less important.

Bloom should never imply:

> No time = optional or less valuable.

Scheduling is a tool, not a requirement.

---

## Routine Guidance

Bloom may provide gentle guidance such as:

> Keep it flexible. You can adjust as needed.

Guidance should remain supportive rather than prescriptive.

---

# 7. Focus

Focus should provide a calm way to begin and remain with an activity.

Core capabilities may include:

- Start
- Pause
- Resume
- End/reset
- Accessible timer state
- Selected durations
- Optional custom duration
- Optional ambient/background sound
- Reflection after focus where appropriate
- Focus history feeding gentle Progress

Focus must not pressure users to achieve a target amount of time.

Sprout Focus may use simplified durations:

- 2 minutes
- 5 minutes
- 10 minutes
- Choose

---

# 8. Moments

Moments are Bloom's private reflection space.

Users should be able to:

- Create a Moment
- Write a short reflection
- Add supported tags
- Add an image where enabled
- View previous Moments
- Return to meaningful memories
- Delete their own Moments

Moments are private by design.

They are not a social feed.

Bloom does not add:

- Likes
- Followers
- Public reactions
- Engagement scores
- Public sharing by default

Private uploaded media is stored using Bloom's approved private-media
architecture.

---

# 9. Progress

Progress helps users recognise what they have done without converting behaviour
into a performance score.

Progress may include:

- Routine activity
- Completed steps
- Focus activity
- Moments
- Personal wins
- Weekly activity
- Gentle historical patterns
- Flower/garden progress in Sprout

Progress must not include:

- Streaks
- Competitive rankings
- Productivity scores
- Missed-day penalties
- "Start again" messaging
- Shame-based recovery messaging

Progress should answer:

> **What has happened?**

rather than:

> **How well did you perform?**

---

## Weekly Flow

Bloom may use a compact Weekly Flow representation.

Visual variation between days is acceptable, but it should not become a hidden
score.

Where numbers are unnecessary, Bloom may use its established gentle visual or
emoji language.

The goal is awareness rather than evaluation.

---

## Sprout Growth

Sprout may represent progress through a flower-growth sequence such as:

```text
Seed
  ↓
Shoot
  ↓
Leaves
  ↓
Bud
  ↓
Bloom
```

Thresholds should be gentle and lower than a traditional gamified progression
system.

The purpose is visual encouragement, not performance ranking.

Guardian settings may allow numeric progress to be hidden or shown.

---

# 10. Accessibility

Accessibility is part of the product architecture rather than a final polish
task.

Bloom v3 should support:

- Keyboard navigation
- Semantic HTML
- Screen-reader-friendly structure
- Accessible names and labels
- Visible focus indicators
- Appropriate colour contrast
- Text-size controls
- Reduced Motion
- High contrast
- Dark/light appearance
- OpenDyslexic support where retained
- Additional readable font options where approved
- Touch-friendly target sizes
- Responsive layouts
- Accessible validation
- Accessible error messaging

Accessibility functionality is not a paid premium feature.

---

## Reduced Motion

Meaningful information must never depend on animation.

Bud, progress animation and decorative motion must have useful static Reduced
Motion alternatives.

---

## Accessibility QA

Critical flows should include:

- Automated axe-core checks
- Keyboard-only testing
- Focus-order checks
- Visible-focus checks
- Reduced Motion testing
- Text-scaling checks
- Basic screen-reader testing before major releases

---

# 11. Themes and Personalisation

Themes control appearance.

Modes control behaviour.

Accessibility presentation controls remain distinct from both.

Approved Bloom visual themes include:

- Standard Bloom
- Chamomile & Oat
- Twilight Slate
- Terracotta Dust
- Violet Hour

Dark mode and high contrast remain accessibility/presentation controls rather
than standalone themes.

Themes may be introduced incrementally during the v3 generation rather than
all being required in the first implementation slice.

---

# 12. Bloom Brand System

Bloom v3 is a visual evolution of Bloom.

---

## Primary Mark

The canonical Bloom mark remains the five-petal flower.

The standard Bloom identity should use:

- Five-petal line geometry
- Botanical multi-tone treatment
- Dark forest-green serif Bloom wordmark where appropriate

The five-petal geometry remains recognisable across modes and themes.

---

## Sprout / Bud

Sprout may use the friendlier filled flower/Bud character.

Bud is a 2D / 2.5D illustrated character.

Rive is the preferred runtime for stateful Bud animation.

CSS/SVG may be used for simpler interface motion.

A real-time 3D Bud is not required.

Three.js / React Three Fiber are not part of the default v3 architecture.

---

## Product Labels

Version labels such as:

- `v3.0.0-beta.1`
- `Public Beta`

are product/status UI elements.

They are not permanent parts of the core Bloom logo.

---

# 13. v3 Information Architecture

Bloom v3 should maintain clear product-shell boundaries for:

```text
Public
Auth
Authenticated App
Sprout
Demo
```

These remain part of one maintainable web application unless a later concrete
deployment requirement justifies separation.

The v3 information architecture should keep primary navigation focused on the
core product rather than administrative settings.

Desktop and mobile may present navigation differently while exposing the same
underlying product capabilities.

---

# 14. Desktop Experience

Desktop remains a complete Bloom experience.

Desktop may particularly support:

- Planning
- Routine management
- Reflection
- Progress review
- Account/profile management
- Guardian management
- Accessibility configuration

The approved visual direction includes a lighter application shell rather than
a heavy traditional dashboard.

Detailed layouts remain governed by approved Figma designs and dedicated UI
tickets.

---

## Desktop Navigation

The intended primary desktop navigation includes:

**Home · Routines · Focus · Moments · Progress · Profile**

Settings, billing, guardian controls and deeper accessibility settings should
remain within the relevant account/profile areas rather than occupying primary
navigation.

---

# 15. Mobile Web Experience

Mobile web must be intentionally designed.

The Home experience should prioritise immediate usefulness rather than trying
to display every desktop panel.

Mobile should support:

- Compact header
- Greeting
- Current mode/context
- Quick accessibility access
- Active routine
- Current/next steps
- Focus access
- Moment access
- Oasis access
- Persistent mobile navigation where appropriate
- Touch-friendly interaction

Primary mobile navigation may use:

**Home · Routines · Focus · Moments · Progress**

Profile can be accessed through the header/avatar where appropriate.

Mobile web remains a complete accessible fallback even after native iOS exists.

---

# 16. Public v3 Experience

Bloom v3 should clearly separate public and authenticated experiences.

The intended structure is:

```text
Bloom Landing Page
        │
        ├── Product information
        ├── Public Demo
        │     ├── Bloom Personal Demo
        │     └── Sprout Demo
        │
        ├── Sign In
        ├── Register
        │
        └── Authenticated Bloom
              ├── Adult Profile
              └── Sprout Profile(s)
```

The public experience should not require an account simply to understand or
explore Bloom.

Bloom Education remains outside the critical path to v3.

---

# 17. Onboarding

New users should receive a concise, calm onboarding flow.

Potential adult onboarding steps include:

1. Welcome to Bloom
2. Essential account/profile setup
3. Accessibility and appearance preferences
4. Optional experience preferences
5. Enter Bloom

Onboarding should:

- Be concise
- Be skippable where appropriate
- Save progress where required
- Avoid unnecessary personal questions
- Avoid pressure to configure everything immediately

Sprout profile creation and guardian settings should be handled separately from
ordinary adult onboarding.

The existing **"You're in Bloom"** direction may be retained and refined where
it still fits the v3 design.

---

# 18. Help, Feedback and Errors

Users should have an easy way to:

- Get help
- Send feedback
- Report a problem

Feedback storage must accurately reflect its implementation state.

Bloom should never claim feedback has been submitted to a server when it has
only been stored locally.

---

## Error State System

Bloom should use calm, illustrated error states where controlled UI can be
provided.

### Wilting Plant

Used for:

- 404
- Application errors
- Server errors
- Failed page/component states
- General errors without a more specific state

Example:

> **Something needs a moment.**
>
> We're having trouble with this right now.
>
> **[ Try again ]**

Example 404:

> **This page seems to have wandered off.**
>
> We couldn't find what you were looking for.
>
> **[ Back to Bloom ]**

Example server error:

> **Even plants have off days.**
>
> Something didn't grow quite right. Try again in a moment.
>
> **[ Try again ]**

---

### Cloud

Used for:

- Offline state
- Connection loss
- Timeouts
- Backend temporarily unavailable
- Extended loading caused by connectivity

Example:

> **A little cloudy right now.**
>
> We couldn't connect to Bloom. Try again when you're ready.
>
> **[ Try again ]**

Example timeout:

> **This is taking a little longer.**
>
> Bloom hasn't responded yet. You can try again when you're ready.
>
> **[ Try again ]**

---

## Error Design Rules

- Do not blame the user.
- Avoid unnecessary technical terminology.
- Give one clear recovery action where possible.
- Preserve entered data where technically possible.
- Do not imply an error has been reported unless it actually has.
- Error meaning must not depend on illustration alone.
- Error headings/descriptions must remain available to assistive technology.
- Reduced Motion preferences must be respected.
- Production interfaces should use Bloom illustration language rather than
  depending on emoji for error meaning.

---

# 19. Reminders and Notifications

Productivity reminders are opt-in.

Bloom must not automatically pressure the user because something was missed.

Reminder state is stored in PostgreSQL.

Initial low-volume scheduled processing uses Render Cron Jobs.

The browser does not need to remain open for scheduled work to exist.

Future delivery channels may include:

- In-app reminders
- Web Push / PWA notifications
- Native iOS APNs notifications

Account/security email may be handled by the identity provider where
appropriate.

SMS is not part of the initial v3 scope.

Redis/Celery or another queue system is introduced only if actual workload
requirements justify it.

---

# 20. Media

Private user-generated media is stored outside PostgreSQL.

Approved approach:

```text
Client
   ↓
FastAPI authorization
   ↓
short-lived presigned URL
   ↓
AWS S3
```

PostgreSQL stores:

- Media ID
- Ownership
- Profile association
- Object/storage key
- Content type
- Size
- Purpose
- Created timestamp
- Other necessary metadata

Rules:

- S3 buckets are private by default.
- Generated object keys are used.
- Original filenames are metadata only.
- Original filenames are not trusted as object keys.
- MIME/type validation is required.
- File-size validation is required.
- FastAPI remains the authorization boundary.
- Public Bloom UI assets remain part of the frontend delivery pipeline.
- Orphaned uploads should eventually be cleaned through scheduled maintenance.

CloudFront, advanced image transformation and dedicated malware-scanning
infrastructure are deferred until a concrete requirement justifies them.

---

# 21. Payments and Entitlements

Web payments use Stripe.

Preferred web flow:

- Stripe Checkout
- Stripe Customer Portal

Bloom does not store raw payment-card data.

Payment-provider state is translated into Bloom-owned entitlements.

```text
Stripe / future App Store
          ↓
       FastAPI
          ↓
Bloom entitlement
          ↓
     PostgreSQL
```

FastAPI determines whether an account may access paid functionality.

The frontend cannot grant premium access.

Stripe webhooks must be signature-verified and processed idempotently.

Future App Store transaction/server-notification handling must feed the same
Bloom entitlement layer.

Founder/lifetime access should use the same entitlement model rather than
special frontend conditions.

Future native iOS purchases use StoreKit 2.

RevenueCat is deferred unless native billing complexity later justifies it.

Exact pricing, feature tiers, free/paid boundaries and Founder financial
benefits remain separate product decisions.

---

# 22. Founding Beta Group

The initial beta cohort may begin with a small group of approximately 10
testers before broader beta availability.

These users may receive Founding Member status.

Potential Founding Member benefits may include:

- Free Bloom access throughout beta
- A defined period of free access following paid launch
- Permanent Founding Member account status
- A founder discount
- Early access to selected future features
- Direct beta feedback opportunities
- Optional acknowledgement during public launch
- Personal thank-you
- Optional referral benefits

Exact financial benefits remain subject to later pricing decisions.

Founding status must not depend on:

- Usage streaks
- Routine completion streaks
- Daily engagement targets
- Productivity requirements

---

# 23. Referrals

Referral functionality should remain deliberately simple if introduced during
the beta period.

Potential initial capabilities include:

- Unique referral codes
- Optional referral field during onboarding
- Basic tracking
- Modest capped rewards

A referral may be considered successful when the referred user creates an
account and completes the required onboarding/account setup.

Rewards must not depend on:

- Completing routines for a certain number of days
- Maintaining activity streaks
- Maintaining a minimum level of productivity

Complex referral infrastructure is not required for the initial v3 beta.

---

# 24. PWA and Offline Boundary

Bloom web should be installable as a PWA.

Initial v3 PWA capability includes:

- Web app manifest
- Installation metadata/icons
- Service-worker infrastructure
- Static/app-shell caching
- Friendly offline state
- HTTPS production delivery
- Appropriate public metadata/link previews
- Reliable mobile browser behaviour

Initial v3 is not a full offline-first application.

Deferred:

- Authenticated offline mutation queues
- Offline task/routine editing
- Conflict resolution
- Complex background synchronisation
- Cross-device offline reconciliation
- Custom sync infrastructure

Private authenticated API responses should not be persistently cached by the
service worker by default.

Demo experiences may remain locally usable where practical.

---

# 25. Native iOS Direction

Native iOS is part of Bloom's future production direction but does not block
the initial web implementation.

Approved native technology:

- Swift
- SwiftUI
- Swift Concurrency
- Bloom `/api/v1` REST API
- Keychain for sensitive local credentials/tokens
- StoreKit 2
- APNs

Native iOS is another Bloom client.

It is not another backend and is not a wrapped web application.

The backend continues to enforce:

- Ownership
- Authorization
- Profile boundaries
- Entitlements

The first native release does not require complete web feature parity.

High-value native experiences may include:

- Home / Today
- Tasks
- Routines
- Focus
- Moments
- Sprout
- Notifications
- Core profile/settings

React Native, Flutter and Capacitor are not part of the approved initial native
architecture.

Android, watchOS and macOS native applications are deferred.

---

# 26. Technical Architecture

## Frontend

Approved target:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- Custom Bloom design system
- Selective Radix UI primitives
- React Hook Form
- Zod
- TanStack Query
- React state/context first
- Rive where appropriate
- Vitest
- React Testing Library
- Playwright

Redux is not part of the default stack.

Three.js / React Three Fiber are not part of the default stack.

One maintainable Next.js web application should contain the public, auth,
authenticated app, Sprout and demo route/layout boundaries unless a later
deployment requirement justifies separation.

---

## Backend

Approved target:

- Python
- FastAPI
- Pydantic v2
- PostgreSQL
- SQLAlchemy 2
- Async patterns where appropriate
- asyncpg
- Alembic
- REST/JSON
- `/api/v1`
- OpenAPI
- pytest
- HTTPX

Architecture:

> **Modular monolith**

Logical domains may include:

- Accounts
- Profiles
- Tasks
- Routines
- Focus
- Moments
- Progress
- Sprout
- Settings
- Notifications
- Billing

These remain logically separated inside one deployable FastAPI application.

No microservices and no GraphQL are required for initial v3.

---

## API Contracts

SQLAlchemy models must not be exposed directly as public API contracts.

API request/response schemas should remain separate from persistence models.

Production errors must not expose:

- Stack traces
- Database details
- Secret values
- Internal implementation details that create security risk

A consistent API error shape should be established during implementation.

---

## Authentication

Approved direction:

- Clerk for adult / guardian identity
- FastAPI verifies external identity tokens
- Bloom owns account/profile records
- Sprout profiles do not independently authenticate through Clerk
- FastAPI remains authoritative for permissions

Existing v2.2 authentication remains intact until its dedicated migration
implementation ticket.

---

# 27. Deployment and Production Infrastructure

Approved initial production topology:

```text
GitHub
   │
   ├── GitHub Actions CI
   │
   ├── Vercel → Next.js
   │
   └── Render → Dockerised FastAPI
                    │
                    ├── Render PostgreSQL
                    ├── Render Cron Jobs
                    └── AWS S3
```

Additional services include:

- Clerk
- Stripe
- Sentry

The intended stable API domain is:

`https://api.bloomapp.uk`

Bloom-owned domains should remain the stable public contract even when an
underlying hosting provider changes.

---

## Docker

The FastAPI backend should be containerised for production.

Local development may use Docker Compose for:

- PostgreSQL
- Supporting infrastructure where needed

Next.js does not need to run inside Docker for normal local development.

---

## Database Migration Rules

Alembic is the sole production schema-migration mechanism.

Production schema management must not depend on:

```python
Base.metadata.create_all()
```

Production migrations run explicitly before backend deployment.

A failed migration must block deployment.

Destructive schema evolution should use backwards-compatible /
expand-and-contract techniques where appropriate.

A typical safe migration pattern is:

```text
Add new structure
        ↓
Deploy compatible code
        ↓
Migrate/backfill data
        ↓
Verify
        ↓
Remove old structure later
```

---

## Environments

Bloom recognises separate:

- Development
- Preview / Staging
- Production

Preview/staging environments must not casually write test data into the
production database.

Environment configuration must remain explicitly separated.

---

## Secrets

Secrets belong in platform secret stores.

Examples:

- Vercel Environment Variables
- Render Environment Variables
- GitHub Actions Secrets
- Local ignored `.env` / `.env.local` files

The repository should provide an `.env.example` containing variable names and
safe example values only.

Public browser variables such as:

- `NEXT_PUBLIC_*`
- legacy `VITE_*`

must never contain secret credentials.

---

## AWS Permissions

Bloom should use least-privilege AWS access.

The backend should receive only the S3 permissions required for the Bloom media
bucket.

Do not use broad administrative AWS credentials for application runtime access.

---

# 28. Testing and Quality

Bloom v3 testing uses:

## Frontend

- Vitest
- React Testing Library

## Backend

- pytest
- HTTPX

## End-to-End

- Playwright

## Accessibility

- axe-core
- Manual accessibility checks

Production-relevant database tests use PostgreSQL.

SQLite must not be relied upon as proof of production PostgreSQL behaviour.

---

## Required CI Quality Gates

CI should validate, as applicable:

- Linting
- TypeScript typechecking
- Frontend unit/component tests
- Backend tests
- PostgreSQL integration tests
- Alembic migration tests
- Production frontend build
- Production backend build/container validation
- Critical Playwright journeys

Required checks should gate merges once the relevant v3 infrastructure is in
place.

Main should not knowingly accept failing required checks.

---

## Migration Testing

CI should validate:

```text
Fresh PostgreSQL database
        ↓
alembic upgrade head
        ↓
SUCCESS
```

When v2 → v3 production migrations begin, CI should also validate supported
upgrade paths from the previous production schema.

---

## Authorization Testing

Explicit automated regression tests are required for security-sensitive
ownership boundaries.

Examples:

```text
Guardian A owns Sprout profile A
Guardian B requests Sprout profile A
                  ↓
                DENY
```

and:

```text
Account A owns Moment A
Account B requests Moment A
                  ↓
                DENY
```

Client-side hiding is not a substitute for backend authorization tests.

---

## External Providers

Ordinary automated tests should not depend unnecessarily on live:

- Clerk
- Stripe
- AWS

Provider boundaries may be mocked in normal unit/integration tests.

Separate test/sandbox flows should validate real provider integrations where
appropriate.

---

## Regression Rule

If a production defect can reasonably be reproduced automatically, its fix
should include a regression test.

Bloom does not target arbitrary 100% code coverage.

Meaningful protection of critical workflows and security boundaries is more
important than superficial coverage percentages.

---

# 29. Observability and Reliability

Bloom uses Sentry for frontend/backend application errors and selected
performance tracing.

FastAPI should emit structured production logs.

Requests should receive correlation/request IDs.

Production telemetry should identify:

- Environment
- Release/version
- Commit where available

Sensitive information must not be logged.

Do not log:

- Passwords
- Authentication tokens
- Payment/card data
- Secret credentials
- Signed S3 URLs
- Raw authentication headers
- Unnecessary Sprout/personal content

Prefer internal identifiers over personal information.

---

## Sprout Privacy

Observability should minimise data collection for Sprout.

Prefer:

```text
profile_id = prof_123
operation = routine_update
status = failed
```

instead of storing:

- Child names
- Routine text
- Moment contents
- Free-form private content

unless there is a specific approved operational reason.

---

## Health Endpoints

Bloom exposes:

```text
GET /health/live
GET /health/ready
```

Liveness answers whether the application process is alive.

Readiness answers whether the application is able to serve Bloom traffic,
including required infrastructure such as PostgreSQL.

Optional third-party providers should not automatically make Bloom appear
completely unavailable.

---

## Initial Operational Monitoring

Initial production monitoring uses:

- Vercel platform diagnostics
- Render platform logs/metrics
- Sentry
- External uptime checking

The architecture should remain OpenTelemetry-compatible.

The following are deferred until scale or operational need justifies them:

- Dedicated Prometheus/Grafana infrastructure
- ELK/OpenSearch
- Loki
- OpenTelemetry Collector infrastructure
- Full commercial observability platforms

---

# 30. Explicit Initial v3 Exclusions

The following are not required for the initial v3 production architecture:

- Microservices
- GraphQL
- Redux
- Kubernetes
- ECS
- EKS
- Mandatory Terraform
- Service mesh
- Self-hosted PostgreSQL
- Multi-region infrastructure
- Redis / Celery without demonstrated need
- RevenueCat without demonstrated need
- Full offline synchronisation
- Complex conflict-resolution engine
- Custom cross-device sync infrastructure
- Android native app
- watchOS native app
- macOS native app
- React Native
- Flutter
- Capacitor
- Production Bloom Education
- Multi-guardian household support
- Large AI feature set
- Social feeds
- Competitive features
- Productivity scores
- Streaks
- SMS reminders

These may be reconsidered through future product/architecture decisions.

---

# 31. v3 Release Path

The intended v3 development sequence is:

```text
v2.2.0
Stable production foundation
        ↓
v2.3
v3 Foundation
        ↓
v2.4
New Bloom Shell
        ↓
v2.5
Core Experience
        ↓
v2.6
Modes + Personalisation
        ↓
v2.7
Sprout
        ↓
v2.8
Production Systems
        ↓
v2.9
Beta Hardening
        ↓
v3.0.0-beta.1
Public Beta
```

These milestones describe the intended development sequence rather than a
promise that every feature must wait for one exact release number.

Scope may move when implementation evidence justifies it, but changes should be
recorded deliberately.

---

# 32. Definition of v3.0.0-beta.1 Public Beta

Bloom can enter public beta when:

- Registration/login/session behaviour is dependable.
- Clerk/Bloom account boundaries work correctly.
- Authenticated data persists correctly.
- Account and demo data remain isolated.
- Adult and Sprout data boundaries are enforced.
- PostgreSQL is authoritative for production account data.
- Alembic production migrations are reliable.
- Core Bloom Personal workflows are usable.
- Everyday Mode is stable.
- Low Demand meets its approved beta implementation scope.
- Oasis meets its approved beta implementation scope.
- Sprout meets its approved beta implementation scope.
- Routines and Tasks are dependable.
- Focus is dependable.
- Moments are dependable.
- Progress remains low-pressure and useful.
- Accessibility controls work reliably.
- Accessibility preferences persist where appropriate.
- Responsive desktop web behaviour is dependable.
- Responsive mobile web behaviour is dependable.
- Core PWA/installability behaviour works.
- Loading states are intentionally handled.
- Empty states are intentionally handled.
- Authentication errors are intentionally handled.
- Network failures are intentionally handled.
- Offline states are intentionally handled.
- Application errors are intentionally handled.
- Critical authorization rules have automated regression coverage.
- Production frontend deployment is stable.
- Production FastAPI deployment is stable.
- Production PostgreSQL is stable.
- Database migrations have a reliable production strategy.
- Production monitoring/error reporting is available.
- Production domain configuration is complete.
- Critical accessibility issues have been addressed.
- Critical beta-blocking bugs have been resolved.
- Release validation succeeds.
- Production smoke testing succeeds.
- README and product documentation describe the actual deployed product.

Native iOS production implementation does not block the web public beta.

Production paid billing does not need to block beta if commercial access
remains free or Founder-based during that period.

Bloom Education does not block the v3 public beta.

Advanced offline-first functionality does not block the public beta.

---

# 33. Guiding Release Principle

Bloom v3 does not need every conceivable Bloom feature before real people use
it.

It needs to be:

- Cohesive
- Calm
- Accessible
- Secure
- Understandable
- Dependable
- Worth testing

The guiding principle remains:

> **Build a Bloom worth testing, learn from the people using it, and grow from there.**
