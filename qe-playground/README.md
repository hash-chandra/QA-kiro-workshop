# QE Playground

A React + Fastify practice application designed for test automation training. It provides a realistic task-management UI and REST API with built-in test hooks (`data-testid` attributes, seeded data, an intentionally flaky endpoint) so QA engineers can write and refine automated tests against a controlled environment.

## Setup

```bash
npm run install:all   # install server + client dependencies
npm run dev           # start both server (port 3000) and client (port 5173)
```

Or run them individually:

```bash
npm run dev:server    # Fastify API on http://localhost:3000
npm run dev:client    # Vite React app on http://localhost:5173
```

## Test Credentials

| Email                    | Password   | Role   |
|--------------------------|------------|--------|
| `admin@playground.dev`   | `admin123` | admin  |
| `tester@playground.dev`  | `test123`  | tester |

## UI Pages

| Page       | Route        | Key Elements                                                  |
|------------|--------------|---------------------------------------------------------------|
| Login      | `/`          | Email/password form, validation errors, redirect on success   |
| Dashboard  | `/dashboard` | Task table, search, status filter, create/edit/delete tasks, confirm dialog, toast notifications, welcome message |

All interactive elements expose `data-testid` attributes for reliable test selectors.

### UI Components

| Component | `data-testid` | Description |
|-----------|---------------|-------------|
| Task table | `task-table` | Sortable table with ID, title, status, assignee, actions |
| Search | `search-input` | Filters tasks by title |
| Status filter | `status-filter` | Dropdown: All / Todo / In Progress / Done |
| Add task form | `task-form` | Title, status, assignee fields with validation |
| Edit modal | `edit-task-modal` | Pre-filled form to update task fields |
| Confirm dialog | `confirm-dialog` | "Are you sure?" prompt before delete |
| Toast | `toast-message` | Success notification (auto-dismiss after 3s) |

## API Endpoints

### Auth
| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/api/auth/login`   | Login (sets session cookie) |
| POST   | `/api/auth/logout`  | Logout (clears cookie)   |
| GET    | `/api/auth/me`      | Get current user         |

### Tasks
| Method | Endpoint           | Description                                      |
|--------|--------------------|--------------------------------------------------|
| GET    | `/api/tasks`       | List tasks (query: `status`, `assignee`, `search`) |
| GET    | `/api/tasks/:id`   | Get task by ID                                   |
| POST   | `/api/tasks`       | Create task (`title`, `status`, `assignee`)      |
| PUT    | `/api/tasks/:id`   | Update task                                      |
| DELETE | `/api/tasks/:id`   | Delete task                                      |

### Users
| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | `/api/users`       | List users         |
| GET    | `/api/users/:id`   | Get user by ID     |
| POST   | `/api/users`       | Create user        |
| PUT    | `/api/users/:id`   | Update user        |
| DELETE | `/api/users/:id`   | Delete user        |

### Utility
| Method | Endpoint         | Description                                      |
|--------|------------------|--------------------------------------------------|
| GET    | `/api/health`    | Health check                                     |
| GET    | `/api/unstable`  | Random 0-3 s delay, ~30% failure rate (flaky test demos) |

## Project Structure

```
├── client/                   # React (Vite) front-end
│   └── src/
│       ├── api/client.js     # API client (fetch wrappers)
│       ├── components/       # Navbar, TaskForm, EditTaskModal, ConfirmDialog, Toast
│       └── pages/            # LoginPage, DashboardPage
├── server/                   # Fastify back-end
│   └── src/
│       ├── routes/           # auth, tasks, users, unstable
│       ├── store.js          # in-memory data store + seed data
│       └── index.js          # server entry point
└── package.json              # root scripts (concurrently)
```

## Tech Stack

- **Client** — React 19, React Router 7, Vite
- **Server** — Fastify 5, in-memory store (no database)
- **Data** — seeded on startup, resets on server restart
