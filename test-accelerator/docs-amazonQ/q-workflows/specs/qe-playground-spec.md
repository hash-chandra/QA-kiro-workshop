# QE Playground — Application Specification

## Overview
A React + Fastify task-management application designed for test automation training.

## Tech Stack
- **Client**: React 18+, Vite, TypeScript, React Router 7 — port `5173`
- **Server**: Fastify 5+, TypeScript, in-memory store — port `3000`
- **Root**: concurrently to run both processes

## Project Structure
```
qe-playground/
├── client/
│   └── src/
│       ├── api/client.js          # fetch wrappers (get, post, put, delete)
│       ├── components/            # Navbar, TaskForm
│       └── pages/
│           ├── LoginPage.jsx
│           └── DashboardPage.jsx
├── server/
│   └── src/
│       ├── routes/                # auth, tasks, users, unstable
│       ├── store.js               # in-memory data store + seed data
│       └── index.js               # server entry point
└── package.json                   # root scripts (concurrently)
```

## Test Credentials
| Email                    | Password   | Role   |
|--------------------------|------------|--------|
| admin@playground.dev     | admin123   | admin  |
| tester@playground.dev    | test123    | tester |

## Key Requirements
- All API endpoints must return proper HTTP status codes (200, 201, 400, 404, 500)
- All interactive UI elements must have `data-testid` attributes for test automation
- Session-based authentication using `@fastify/session`
- CORS enabled for `http://localhost:5173`
- In-memory data store with seed users and sample tasks (resets on server restart)
- Flaky `/api/unstable` endpoint with random delay and ~30% failure rate for test demos

## Root package.json Scripts
```json
{
  "install:all": "npm install && cd client && npm install && cd ../server && npm install",
  "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
  "dev:server": "cd server && npm run dev",
  "dev:client": "cd client && npm run dev"
}
```
