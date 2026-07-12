# 🌱 Bloom

Calm routines for every brain.

Bloom is an accessibility-focused routine, focus, and progress-tracking app built with React, JavaScript, Tailwind CSS, Vite, FastAPI, and Vercel.

It is designed around calm UI, gentle task sequencing, demo routines, focus sessions, reflection moments, and neurodivergent-friendly interaction patterns.

Bloom currently focuses on **Bloom Personal**: a personal routine, focus, progress, and task support app being prepared for public beta feedback.

## Live Demo

[Experience Bloom](https://bloom-app-three-xi.vercel.app/)

## Current Status

Bloom has completed the public Overview v2 refresh and is now moving into the **v2.1.0 authentication phase**.

| Area | Status |
| --- | --- |
| Public Overview landing page | ✅ Complete |
| Demo mode entry from Overview | ✅ Complete |
| Public About, Privacy, and Accessibility pages | ✅ Complete |
| Desktop sidebar and mobile navigation | ✅ Complete |
| Routines, tasks, focus, and progress pages | ✅ Complete |
| Moments dashboard | ✅ Complete |
| Light/dark mode | ✅ Complete |
| Text size controls | ✅ Complete |
| OpenDyslexic font toggle | ✅ Complete |
| Reduce motion setting | ✅ Complete |
| Login/create account modal UI | 🚧 In progress |
| Backend auth/config hardening | 🚧 In progress |

## Features

- Calm routine and task sequencing
- Focus session support
- Progress and reflection pages
- Moments dashboard
- Demo mode from the public overview page
- Login and create account modal UI
- Light and dark mode
- Text size controls
- OpenDyslexic font toggle
- Reduce motion setting
- Responsive desktop and mobile layouts
- Public About, Privacy, and Accessibility pages
- Backend security/configuration improvements for JWT and CORS

## Screenshots

<table>
  <tr>
    <td>
      <img src="./public/images/bloom-overview.png" width="400"/>
      <br/>
      <strong>Public Overview</strong>
    </td>
    <td>
      <img src="./public/images/bloom-create-account.png" width="400"/>
      <br/>
      <strong>Create Account Modal</strong>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./public/images/bloom-moments.png" width="400"/>
      <br/>
      <strong>Moments</strong>
    </td>
    <td>
      <img src="./public/images/bloom-home.png" width="400"/>
      <br/>
      <strong>Home</strong>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./public/images/bloom-routines-dark.png" width="400"/>
      <br/>
      <strong>Routines - Dark Mode</strong>
    </td>
    <td>
      <img src="./public/images/bloom-focus-dark.png" width="400"/>
      <br/>
      <strong>Focus - Dark Mode</strong>
    </td>
  </tr>
</table>

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, JavaScript, Tailwind CSS, Vite |
| Backend | Python, FastAPI, JWT auth configuration, environment-based CORS |
| Deployment | Vercel |
| Tools | Git, GitHub, VS Code, Claude Code, ChatGPT |

## Quick Start

Clone the repository:

```bash
git clone https://github.com/Iris408/bloom-app.git
cd bloom-app
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build check:

```bash
npm run build
```

## Documentation

More detailed project documentation is available in the `docs/` folder.

| Document | Description |
| --- | --- |
| [Setup Guide](./docs/setup.md) | Local setup and build commands |
| [Product Roadmap](./docs/product-roadmap.md) | Authentication, persistence, beta, and future backend plans |
| [Accessibility Notes](./docs/accessibility-notes.md) | Neurodivergent-friendly design, readability controls, and calm UI choices |
| [Demo Mode](./docs/demo-mode.md) | Demo flow, preloaded routines, focus support, and demo boundaries |
| [Project Details](./docs/project-details.md) | Architecture, AI-assisted workflow, limitations, and learning notes |
| [Beta Notes](./docs/bloom-beta-notes.md) | Beta feedback planning |
| [Security & Config](./docs/bloom-security-config.md) | Backend security and configuration notes |
| [AI-Assisted Workflow](./docs/bloom-ai-workflow.md) | Notes on supervised AI-assisted development |

## Project Summary

Bloom is a product-focused frontend/full-stack capstone project built to practise accessible UI design, React app structure, routine/task workflows, demo mode design, authentication planning, backend security configuration, and product documentation.

## Author

Built by Iris408