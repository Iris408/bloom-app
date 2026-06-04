# Bloom 🌱

Calm routines for every brain.

Bloom is a personal full-stack capstone project focused on building a calm, accessible visual routine and task sequencing application. The app is designed to help users create, organise, and follow step-by-step routines in a clear, supportive, and neurodivergent-friendly way.

## Project Overview

Bloom is being built as a web-first visual task sequencer and routine builder. The first version focuses on **Bloom Personal**, a personal-use routine app with accessible layouts, task cards, routine pages, progress tracking, rewards, and multiple user modes.

The long-term vision is **Bloom Education**, which may expand the app into an educational platform for students, parents, teachers, and school administrators. This education phase is planned for the future after the personal version is complete and stable.

## Core Goals

- Build a calm and accessible routine-building app
- Support neurodivergent-friendly user experiences
- Provide simple visual step-by-step task guidance
- Include kid-friendly and adult-friendly modes
- Design layouts that work well on desktop and mobile
- Build a strong portfolio-ready full-stack capstone project

## Current Features

- React app structure created with Vite
- Component-based folder structure
- Desktop sidebar navigation
- Mobile bottom navigation
- Header and Footer components
- Reusable Bloom button component
- Task card and task list components
- Emoji picker for new and edited tasks
- Task add, edit, save, cancel, and delete actions
- Main pages created: Overview, Home, Routines, Focus, Progress, Rewards, Profile
- Global app context structure started
- Reusable UI component folder started
- Light and dark mode
- Font size controls
- OpenDyslexic font toggle
- Reduce motion toggle

## Planned Features

- Routine builder
- Add, edit, delete, and reorder routine steps
- Progress tracking
- Streaks, stars, and badges
- Profile switching
- Focus Mode for one-step-at-a-time routines
- Kid Mode with larger buttons, warmer colours, and more emoji-based guidance
- Calm Mode with reduced visual urgency
- Review Mode for completed routines
- Future backend with FastAPI
- Future database persistence
- Future mobile/iOS version

## App Modes

| Mode | Purpose |
|---|---|
| Standard Mode | Clean adult-friendly layout for personal routines |
| Kid Mode | Simplified, warmer, emoji-heavy experience for children |
| Focus Mode | One step shown at a time to reduce distraction |
| Calm Mode | Softer interface with reduced motion and urgency |
| Review Mode | Reflection after completing a routine |
| Education Mode | Long-term future mode for school-based use |

## Tech Stack

### Current Frontend

- React
- JavaScript
- Tailwind CSS
- Vite
- CSS
- Git
- GitHub

### Planned Backend

- Python
- FastAPI
- SQLite / TinyDB for early learning stage
- PostgreSQL in future production-ready versions

### Future Tools

- React Native for iOS
- Vercel for frontend hosting
- Render for backend hosting

## Project Structure

```text
bloom-app/
├── public/
│   └── fonts/
│       └── OpenDyslexic3-Regular.ttf
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── modes/
│   │   ├── tasks/
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskList.jsx
│   │   └── ui/
│   │       └── Button.jsx
│   │       └── DyslexicFontToggle.jsx
│   │       └── FontSizeSlider.jsx
│   │       └── ReduceMotionToggle.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── Focus.jsx
│   │   ├── Home.jsx
│   │   ├── Overview.jsx
│   │   ├── Profile.jsx
│   │   ├── Progress.jsx
│   │   ├── Rewards.jsx
│   │   └── Routines.jsx
│   ├── styles/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
└── package.json