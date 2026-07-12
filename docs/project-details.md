# Project Details

This document contains additional technical and development notes for Bloom.

## Architecture

Current app direction:

```text
React + Tailwind CSS Frontend
        ↓
FastAPI Backend Preparation
        ↓
Future Persistent Database
```

## Frontend Responsibilities

The frontend currently handles:

- Public Overview page
- Public About, Privacy, and Accessibility pages
- Demo mode entry
- Protected app layout
- Sidebar/header navigation
- Routines page
- Tasks and steps
- Focus page
- Progress page
- Moments dashboard
- Profile/avatar UI
- Light/dark mode
- Text size controls
- OpenDyslexic toggle
- Reduce motion setting

## Backend Responsibilities

Backend work is currently focused on security/configuration preparation.

Current backend-related work includes:

- JWT authentication configuration
- Environment-based CORS configuration
- Python virtual environment setup
- Backend security/config hardening

Future backend responsibilities will include:

- User accounts
- Login/session handling
- Persistent routines
- Persistent tasks
- Persistent focus items
- Persistent moments
- Saved profile settings
- Saved accessibility preferences

## AI-Assisted Development Workflow

Bloom includes supervised AI-assisted development as part of the engineering workflow.

AI tools were used for:

- Code review support
- Security and configuration checks
- Git diff review
- Debugging guidance
- README and documentation drafting
- Refactoring suggestions
- Frontend UI polish planning

AI-generated suggestions were reviewed, tested, and committed manually.

Final implementation decisions, testing, Git workflow, and project direction are handled by the developer.

## Current Limitations

- Authentication flow is still being completed.
- Real account data persistence is not finished yet.
- Demo mode and real account data separation is still part of the active roadmap.
- Backend persistence is in progress but not yet fully complete.
- Some future pages/features are planned but not active yet.
- Beta feedback is being received before larger product decisions.

## Recent Completed Work

Recent completed work includes:

- Public Overview v2 redesign
- Login and create account modal polish
- Public About, Privacy, and Accessibility page updates
- Public and protected header layout separation
- Protected app sidebar/header layout restoration
- Moments v1.1.0 UI polish
- Favorite Quote card overlap fix
- Horizontal avatar picker
- Page Controls across public and protected pages
- Backend security/configuration improvements for JWT and CORS

## What I Learned

Through this project, I practiced:

- React frontend app structure
- Tailwind CSS UI building
- Responsive layout design
- Accessibility-focused product design
- Demo mode planning
- Protected/public layout separation
- UI state and settings management
- Authentication planning
- Backend security configuration awareness
- Product documentation
- Supervised AI-assisted development workflow