# Setup Guide

This document explains how to run Bloom locally.

## Installation

Clone the repository:

```bash
git clone https://github.com/Iris408/bloom-app.git
cd bloom-app
```

Install dependencies:

```bash
npm install
```

## Run Locally

Start the Vite development server:

```bash
npm run dev
```

The app usually runs at:

```text
http://localhost:5173
```

## Build Check

Run:

```bash
npm run build
```

This confirms the frontend builds successfully.

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