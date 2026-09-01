# Bloom v3.0.0 Live Beta Specification

> **Status:** Planning  
> **Current stable release:** v2.1.1  
> **Target release:** v3.0.0 Live Beta

Bloom v3.0.0 is a major product release focused on moving Bloom from a polished application and demonstration project into a real, accessible product that can be used and evaluated by a small group of beta testers.

v3.0.0 is an evolution of Bloom rather than a rebrand or framework rewrite.

The release will prioritise product quality, accessibility, calm interaction design, real account persistence, mobile usability, and meaningful beta feedback.

---

## 1. Product Principles

Bloom should remain a calm and flexible space for planning, focusing, reflecting and growing in a way that works for the individual user.

The v3 product should follow these principles:

- Accessibility first
- No streaks
- No productivity scoring
- No punishment for inactivity
- No pressure to complete something at a particular time
- Routine times are always optional
- Progress should inform rather than judge
- Celebrate wins of every size
- Allow users to return without making them feel they have failed
- Reduce unnecessary cognitive load
- Keep important actions easy to find
- Give users control over how Bloom looks and behaves
- Mobile should feel intentionally designed rather than being a compressed desktop interface

---

# 2. Bloom v3 Product Family

Bloom v3 will introduce a clearer distinction between the production product and future product concepts.

## Bloom Personal

Bloom Personal is the primary production application.

v3.0.0 will make Bloom Personal available to a small live-beta group using real accounts and persistent user data.

Bloom Personal includes:

- Everyday Mode
- Low Demand Mode MVP
- Oasis MVP
- Routines
- Focus
- Moments
- Progress
- Personalisation
- Accessibility settings
- Account management

---

## Sprout Mode

Sprout Mode is Bloom's friendlier, more playful experience designed to demonstrate how Bloom could adapt for younger users.

For v3.0.0:

- Sprout is demo-only
- Sprout uses fictional demonstration data
- No real child accounts are required
- No real child information is stored
- No parent/guardian relationship system is required
- Sprout may use a more colourful and playful interface
- Sprout uses its friendly flower character instead of the standard Bloom flower mark

Sprout should retain Bloom's accessibility and low-pressure principles.

---

## Bloom Education

Bloom Education will be presented as a **concept preview and research demo** during the v3 development cycle.

It is **not** a production education platform.

The purpose of the demo is to demonstrate how Bloom could potentially support:

- Learners
- Parents and guardians
- Educators
- SEND/SEN professionals
- Other appropriate support environments

The demo should provide enough quality and depth that it can be shown to others and used to gather meaningful feedback about whether Bloom Education should be developed further.

All learner information displayed in the Education demo **must be and will be fictional.**

**Bloom Education will not introduce production child accounts, real learner information or operational school functionality during v3.**

Any future production release involving children, schools or educational organisations will go through the appropriate and necessary safeguarding, privacy, security and legal reviews.

---

# 3. Modes

## Everyday Mode

The standard Bloom experience.

Everyday Mode provides access to the complete Bloom Personal feature set while maintaining Bloom's calm and flexible interaction style.

---

## Low Demand Mode

Low Demand Mode reduces the amount of information and decision-making presented to the user.

The v3 MVP should explore:

- Reduced information density
- Fewer visible choices
- Simplified language
- Reduced visual stimulation
- Optional shortened routines
- Reduced motion where appropriate
- Easy return to Everyday Mode

Low Demand Mode should modify how Bloom behaves rather than simply applying another colour theme.

---

## Oasis

Oasis is a calm space within Bloom intended for stepping away from planning and productivity.

The v3 MVP may include:

- Calm visual environment
- Quiet timer
- Grounding or breathing tools
- Optional ambient/background sounds
- Quick access to create a Moment
- Simple exit back into Bloom

Oasis should not display:

- Completion percentages
- Outstanding task counts
- Productivity statistics
- Streaks
- Pressure to complete an activity

Oasis should remain easily accessible from the main Bloom experience.

---

## Sprout Mode

Sprout Mode uses a warmer, friendlier and more playful presentation.

For v3 it remains a fictional demonstration experience rather than a production child account system.

---

# 4. Core Bloom Personal Features

## Authentication

v3 must provide dependable:

- Account registration
- Login
- Logout
- Session restoration
- Protected authenticated pages
- Expired-session handling
- Loading states
- Authentication error states

Public demo data and authenticated account data must remain separate.

---

## Persistent User Data

Important user information must persist between sessions.

This includes, where applicable:

- Routines
- Tasks and routine steps
- Focus activity/history
- Moments
- Profile information
- Avatar
- Accessibility preferences
- Theme preferences
- Mode preferences
- Onboarding state

Data must belong to the authenticated user and must not leak between accounts.

---

# 5. Routines

Routines are one of Bloom's primary product experiences.

Users should be able to:

- Create routines
- Edit routines
- Delete routines
- Add routine steps
- Reorder steps where supported
- Complete individual steps
- View routine progress
- Return to incomplete routines
- Use shortened routines where supported

## Optional Times

Times are optional.

A routine step does not require a scheduled time to be meaningful or important.

Bloom should imply that a task without a time is completely optional and up to the user.

The absence of a time must not reduce the importance of a routine step or create pressure to schedule one.

## Routine Guidance

Bloom may provide gentle guidance such as:

> Keep it flexible. You can adjust as needed.

Guidance should remain supportive rather than prescriptive.

---

# 6. Focus

Focus should provide a simple, low-pressure way to begin a focused activity.

The v3 experience should include:

- Clear focus timer
- Start
- Pause
- Resume where appropriate
- End/reset
- Accessible timer state
- Optional background sounds
- Calm visual presentation

Focus history may contribute to Progress, but Bloom should not pressure users to achieve a particular amount of focus time.

---

# 7. Moments

Moments will remain intentionally simple.

Moments are a personal space for short-form journalling and reflection.

Users should be able to:

- Create a Moment
- Add short written reflections
- Add their own image where supported
- View previous Moments
- Return to meaningful memories
- Delete or manage their own Moments

Moments should not become a social feed.

There are no likes, public reactions, follower counts or engagement scores.

---

# 8. Progress

Bloom Progress should help users recognise what they have done without turning their activity into a productivity score.

## Progress May Include

- Routine activity
- Completed steps
- Focus activity
- Moments
- Personal wins
- Weekly activity
- Gentle historical trends

## Progress Must Not Include

- Streaks
- Competitive rankings
- Productivity scores
- Punishment for missed days
- "Start again" messaging
- Pressure to maintain daily usage

## Weekly Flow

The dashboard may show a compact Weekly Flow visual.

Activity bars may be used to provide visual variation between days.

Instead of percentages or numeric performance scores, Bloom will use its existing emoji/visual language.

The purpose is to provide a gentle impression of the user's week rather than a numerical judgement of performance.

---

# 9. Accessibility

Accessibility remains a core Bloom requirement rather than an optional enhancement.

v3 should support:

- Light mode
- Dark mode
- High contrast
- Reduced motion
- Text-size controls
- Accessible keyboard navigation
- Visible focus states
- Screen-reader-friendly labels and structure
- Appropriate colour contrast
- Responsive layouts
- Accessible form validation

## Font Options

Bloom should investigate a small number of intentional font choices.

This may include:

- Bloom default font
- OpenDyslexic **currently available**
- An additional highly readable alternative

Font selection should remain manageable rather than presenting users with an unnecessarily large list.

## Quick Accessibility

Common accessibility controls should remain easy to reach without requiring users to navigate deeply into Settings.

More advanced accessibility preferences may live under:

**Profile → Accessibility** or **Settings → Accessibility**

---

# 10. Themes and Personalisation

Bloom v3 should support a controlled theme system.

This includes:

- Standard Bloom theme
- Dark mode
- High-contrast presentation
- Selected custom colour themes:
  - **Chamomile & Oat** — warm, soft and neutral
  - **Twilight Slate** — cool, muted and understated
  - **Terracotta Dust** — warm, earthy and grounded
  - **Violet Hour** — rich violet and purple tones inspired by the Bloom v3 visual direction

Themes control how Bloom looks.

Modes control how Bloom behaves.

The two systems should remain conceptually separate.

Theme preferences should persist for authenticated users.

---

# 11. Bloom v3 Brand System

Bloom v3 is a visual evolution rather than a rebrand.

## Primary Mark

The canonical Bloom mark is a simple five-petal line flower.

The standard icon should:

- Use line work rather than filled petals
- Use subtly different Bloom green tones across the petals
- Remain recognisable at small sizes
- Work independently from the Bloom wordmark

## Wordmark

The Bloom wordmark remains consistent between modes.

## Mode Adaptation

The flower may adapt its colours depending on the current experience.

Examples:

- Everyday — mixed Bloom greens
- Low Demand — softer/muted tones
- Oasis — calming sage/aqua/blue-green tones
- Dark — lighter sage/cream treatment
- Custom themes — selected theme accents
  - Chamomile & Oat: Warmer cream/oat/chamomile treatment
  - Twilight Slate: Muted slate/blue tones
  - Terracotta Dust: Earthy clay tones
  - Violet Hour: Violet/lilac tones

Sprout is the intentional exception and uses the friendly Sprout flower character.

```text
             BLOOM
               │
       five-petal line flower
               │
     ┌─────────┼─────────┐
     ↓         ↓         ↓
 Everyday    Themes     Modes
     │
     └──────── consistent identity


            SPROUT
               │
               ↓
     playful filled flower
```     

---

# 12. v3 Design North Stars

Two primary visual references will guide v3 implementation.

## Desktop North Star

The Desktop Mockup #3 is the primary desktop design reference.

Key characteristics:

- Lightweight top utility bar
- No traditional permanent sidebar
- Bloom identity and Live Beta status
- Easy accessibility access
- Theme control
- Profile access
- Active Routine as a major dashboard feature
- Focus preview
- Moments preview
- Routine overview
- Gentle Progress preview
- Oasis positioned as an easily accessible calm space
- Floating bottom navigation

Primary desktop navigation:

**Home · Routines · Focus · Moments · Progress · Profile**

Settings, billing, account management and additional accessibility options remain within Profile rather than occupying primary navigation.

---

## Mobile North Star

The Mobile Mockup #2 is the primary mobile design reference.

Mobile should prioritise immediate usefulness over displaying the complete desktop dashboard.

The Home experience should remain concise and minimise unnecessary vertical scrolling.

The primary mobile experience includes:

- Compact Bloom header
- Greeting
- Current mode
- Quick accessibility access
- Active Routine
- Current/next routine steps
- Routine progress
- Quick Focus access
- Quick Moment access
- Quick Oasis access
- Persistent mobile navigation

Primary mobile navigation:

**Home · Routines · Focus · Moments · Progress**

Profile is accessed through the header/avatar rather than requiring another bottom-navigation destination.

Dedicated feature pages contain the richer versions of Focus, Moments and Progress.

---

# 13. Public v3 Experience

Bloom v3 should clearly separate public and authenticated experiences.

The intended structure is:

```text
Bloom Landing Page
        │
        ├── Public Demo
        │     ├── Bloom Personal Demo
        │     ├── Sprout Demo
        │     └── Bloom Education Concept Demo
        │
        ├── Login
        ├── Create Account
        │
        └── Authenticated Bloom Personal
```

The public experience should not require an account simply to understand or explore Bloom.

---

# 14. Onboarding

New authenticated users should receive a short, calm onboarding experience.

Potential onboarding steps include:

1. Welcome to Bloom
2. Choose an initial experience/mode
3. Accessibility and appearance preferences
4. Optional profile setup
5. Enter Bloom

Onboarding should:

- Be concise
- Avoid unnecessary questions
- Be skippable where appropriate
- Save progress
- Avoid pressure to configure everything immediately

The existing **"You're in Bloom"** onboarding direction may be retained and refined.

---

# 15. Help and Feedback

Beta testers must have an easy way to:

- Get help
- Send feedback
- Report a problem

Feedback should be stored appropriately so that beta feedback can be reviewed during development.

Help should remain easy to discover without dominating the primary application interface.

---

# 16. Pricing and Billing

Bloom v3 will establish the initial commercial direction for Bloom Personal.

Before paid access is introduced, the following will be confirmed:

- Pricing range
- Free/paid feature boundaries
- Beta access rules
- Post-beta pricing
- Founding Member benefits
- Cancellation behaviour
- Billing/account management flow

Stripe is the expected payment provider if payment functionality is required for the v3 beta/commercial transition.

Exact pricing remains **TBD**.

---

# 17. Founding Beta Group

The initial live-beta cohort is expected to contain approximately 10 testers.

These users may receive **Founding Member** status.

Potential benefits include:

- Free Bloom Personal access throughout beta
- A defined period of free access following paid launch
- Permanent Founding Member account status
- Permanent founder discount after the free period
- Early access to selected future features
- Direct beta feedback channel
- Optional acknowledgement during public launch
- Personal thank-you at launch
- Optional referral code
- Early previews of future Bloom concepts

Exact financial benefits will be confirmed later alongside pricing.

Founding status should not depend on maintaining a usage streak or meeting engagement requirements.

---

# 18. Referrals

Referral functionality will remain deliberately simple during the initial beta.

The initial system may use:

- Unique referral codes
- Optional referral field during onboarding
- Manual tracking (later automated)
- Modest capped rewards

A referral may be considered successful when the referred user creates an account and completes initial onboarding.

Rewards should not depend on completing routines for a particular number of days or maintaining engagement streaks.

Complex automated referral infrastructure is not required for the initial beta.

---

# 19. Mobile and PWA

Bloom should remain mobile-first in quality even though desktop is also fully supported.

v3 should provide:

- High-quality responsive mobile experience
- Installable PWA where supported
- Appropriate application icons
- Appropriate metadata
- Public link previews
- Mobile-safe navigation
- Touch-friendly controls
- Appropriate offline/network-failure handling

Mobile layouts should be intentionally designed rather than simply shrinking desktop components.

---

# 20. Deployment

v3.0.0 must be available as a real live beta.

The production architecture should include:

- Production frontend
- Production FastAPI backend
- Production PostgreSQL database
- HTTPS
- Environment-based configuration
- Secure secrets management
- Production domain/subdomain
- Squarespace-managed Bloom domain/DNS
- CI checks before release

Exact hosting providers will be confirmed during the deployment milestone.

---

# 21. Technical Direction

Bloom v3 will evolve the existing application rather than introduce an unnecessary framework rewrite.

Current intended direction:

### Frontend
- React
- Vite
- JavaScript / JSX
- Tailwind CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

### Infrastructure
- Docker
- GitHub Actions CI

### Product Services
- Stripe where required
- Squarespace-managed domain
- PWA support

Vue.js, Express.js and a Next.js migration are not required for v3.0.0.

TypeScript may be evaluated separately but is not a prerequisite for the beta.

---

# 22. Reliability Requirements

The beta should intentionally handle:

- Loading states
- Empty states
- API errors
- Authentication errors
- Expired sessions
- Network failures
- Backend unavailability
- Invalid form input
- Missing user data

Bloom's established low-demand presentation should continue where appropriate:

**Icon → short title → one short explanation → optional clear action**

Error handling should inform users without blaming or overwhelming them.

## Error State System

Bloom should use a small illustrated error-state system rather than relying on generic technical error pages wherever the application can provide a controlled response.

Error states should remain calm, concise and actionable.

### Wilting Plant

A slightly drooping Bloom plant illustration represents application and page errors.

The plant should appear temporarily wilted rather than dead, damaged or distressed.

Use for:

- Page not found / 404
- Unexpected application errors
- Server errors
- Failed page or component states
- General errors where a more specific state is unavailable

Example — General Error:

> **Something needs a moment.**  
> We're having trouble with this right now. Try refreshing the page.
>
> **[ Try again ]**

Example — Page Not Found:

> **This page seems to have wandered off.**  
> We couldn't find what you were looking for.
>
> **[ Back to Bloom ]**

Example — Server Error:

> **Even plants have off days.**  
> Something didn't grow quite right. Try again in a moment.
>
> **[ Try again ]**

### Cloud

A simple Bloom-style cloud illustration represents connectivity and temporary network states.

Will be used for:

- Connection lost
- Offline state
- Request timeout
- Backend temporarily unreachable
- Extended loading caused by connectivity

Example — Connection Error:

> **A little cloudy right now.**  
> We couldn't connect to Bloom. Your connection may come back in a moment.
>
> **[ Try again ]**

Example — Timeout:

> **This is taking a little longer.**  
> Bloom hasn't responded yet. You can try again when you're ready.
>
> **[ Try again ]**

### Error Design Rules

- Use simple Bloom line-art illustrations rather than emoji in the production interface.
- Illustrations should visually belong to the same family as the official Bloom flower.
- Do not blame the user.
- Avoid technical terminology unless it is useful.
- Keep explanations short.
- Provide one obvious recovery action where possible.
- Do not imply that an error has been reported or is actively being investigated unless it is actually true.
- Preserve user-entered data wherever technically possible.
- Accessibility information must not depend on the mascot illustration alone.
- Error headings and descriptions must remain available to assistive technology.
- Reduced-motion preferences must be respected if error illustrations are animated.

---

# 23. Explicitly Out of Scope for v3.0.0

The following are not required for the initial Bloom v3 live beta:

- Production Bloom Education
- Real child accounts
- Real learner data
- Parent/child account linking
- Educator/learner account linking
- School administration systems
- Production safeguarding workflows
- Competitive leaderboards
- Productivity scoring
- Streaks
- Social feeds
- Likes/follower systems
- Complex referral infrastructure
- Native iOS application
- Native Android application
- Vue.js migration
- Express.js backend
- Next.js rewrite
- Large AI feature set

Future features may be considered after beta feedback and product validation.

---

# 24. Definition of v3.0.0 Live Beta

Bloom can be considered ready for v3.0.0 Live Beta when:

- Core authentication is stable
- Account data persists correctly
- Demo and authenticated data remain separated
- Core Personal features are usable
- Everyday Mode is complete
- Low Demand Mode MVP is usable
- Oasis MVP is usable
- Sprout Demo is polished
- Public demo experience is available
- Desktop North Star has been substantially implemented
- Mobile North Star has been substantially implemented
- Accessibility settings work reliably
- Themes persist
- Feedback can be submitted
- Pricing and beta terms are defined
- Founding beta access is configured
- Production deployment is stable
- Domain configuration is complete
- Critical accessibility issues have been addressed
- Critical beta-blocking bugs have been resolved
- README and product documentation reflect the live product

Bloom Education Concept Demo may be completed during the late v3 development cycle without introducing production education functionality.

---

# 25. Guiding Release Principle

Bloom v3.0.0 does not need to contain every possible Bloom feature.

It needs to provide a cohesive, accessible and dependable version of the product that real people can use and provide meaningful feedback on.

The goal is:

> **Build a Bloom worth testing, learn from the people using it, and grow from there.**