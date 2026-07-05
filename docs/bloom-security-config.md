# Bloom Backend Security and Configuration

This document summarises recent backend security and configuration improvements.

## Completed Improvements

- Removed an insecure hardcoded JWT `SECRET_KEY` fallback.
- Added fail-fast backend startup validation when required authentication configuration is missing.
- Moved CORS allowed origins into environment variables.
- Configured CORS for local React/Vite development and live Vercel frontend deployment.
- Stabilised backend local setup with a Python virtual environment and dependency checks.

## Example Environment Variables

```env
SECRET_KEY=your_secure_secret_key_here
CORS_ORIGINS=http://localhost:5173,https://your-vercel-app.vercel.app
```

## Why This Matters

Hardcoded secrets are unsafe because they can accidentally be committed to GitHub or reused across environments.

Fail-fast startup behaviour helps catch missing critical configuration early instead of allowing the backend to run in an insecure state.

Environment-based CORS configuration makes it easier to support local development, staging, and production without editing source code.