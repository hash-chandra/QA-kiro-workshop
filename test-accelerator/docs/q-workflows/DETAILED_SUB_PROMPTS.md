# Detailed Sub-Prompts for Complex Steps

This document provides expanded, granular prompts for the more complex steps in the main build guide.

## Step 1 Expanded: Project Setup

### Step 1a: Root Project Structure
```
Create a new directory called "qe-playground" and initialize it with:
- package.json with name "qe-playground"
- Scripts for "install:all", "dev", "dev:server", "dev:client"
- Dependencies: concurrently for running multiple processes
- Two subdirectories: "client" and "server"
- Root .gitignore file excluding node_modules, .env, dist
```

### Step 1b: Client Package Setup
```
In the qe-playground/client directory, create a Vite + React + TypeScript project with:
- package.json with Vite, React 18+, TypeScript, React Router
- vite.config.ts configured for development on port 5173
- tsconfig.json with strict TypeScript settings
- index.html as entry point
- src/main.tsx as React entry point
- Basic App.tsx component
```

### Step 1c: Server Package Setup
```
In the qe-playground/server directory, create a Fastify + TypeScript project with:
- package.json with Fastify 5+, TypeScript, @types/node
- tsconfig.json for Node.js environment
- src/index.ts as server entry point
- Basic Fastify server setup listening on port 3000
- Development script using tsx or ts-node for TypeScript execution
```

## Step 2 Expanded: Server Foundation

### Step 2a: Basic Fastify Server
```
Create server/src/index.ts with:
- Import Fastify and create server instance
- Register @fastify/cors plugin with origin: "http://localhost:5173"
- Register @fastify/formbody for form parsing
- Listen on port 3000 with proper error handling
- Console log when server starts successfully
```

### Step 2b: Session Middleware
```
Add session support to the Fastify server:
- Install and register @fastify/session plugin
- Configure with a secret key for development
- Set secure: false for local development
- Add session typing for TypeScript support
- Create middleware to check authentication status
```

### Step 2c: Basic Route Structure
```
Create the initial API route structure:
- /api/health endpoint that returns { status: "ok", timestamp: Date.now() }
- Route registration using fastify.register()
- Proper async/await patterns
- Basic error handling with try/catch blocks
```

## Step 3 Expanded: Data Store & Seed Data

### Step 3a: Store Module Structure
```
Create server/src/store.ts with:
- TypeScript interfaces for User and Task entities
- User interface: id, name, email, password, role
- Task interface: id, title, description, status, assignee, createdAt, updatedAt
- Export arrays: users and tasks
- Helper functions: findUserByEmail, findUserById, findTaskById
```

### Step 3b: Seed Users Data
```
Add seed data to the store users array:
- User 1: { id: 1, name: "Admin User", email: "admin@playground.dev", password: "admin123", role: "admin" }
- User 2: { id: 2, name: "Test User", email: "tester@playground.dev", password: "test123", role: "tester" }
- Include password hashing or plain text for demo purposes
- Add nextUserId counter for new user creation
```

### Step 3c: Seed Tasks Data
```
Add seed data to the store tasks array with sample tasks:
- Mix of different statuses
- Different assignees
- Realistic task titles and descriptions
- Include nextTaskId counter for new task creation
```

## Step 8 Expanded: React Client Setup

### Step 8a: Vite Configuration
```
Configure client/vite.config.ts with:
- React plugin configuration
- Development server on port 5173
- Proxy configuration for API calls to localhost:3000
- Build output directory configuration
- TypeScript path aliases if needed
```

### Step 8b: React Router Setup
```
Set up React Router in client/src/main.tsx:
- Import createBrowserRouter and RouterProvider
- Create router configuration with routes for "/" and "/dashboard"
- Wrap App component with RouterProvider
- Configure proper error boundaries
```

### Step 8c: Basic App Structure
```
Create client/src/App.tsx with:
- Basic layout component structure
- Navigation bar component placeholder
- Outlet for React Router
- Global CSS imports
- TypeScript prop types
```

## Step 11 Expanded: Dashboard Page Component

### Step 11a: Dashboard Layout
```
Create client/src/pages/DashboardPage.tsx with:
- Welcome message component showing current user name
- Task statistics summary (total, pending, completed)
- Search and filter controls section
- Task table/list display area
- Add new task form section
- All wrapped in semantic HTML with proper data-testid attributes
```

### Step 11b: Task Table Component
```
Create a TaskTable component within Dashboard with:
- Table headers: Title, Status, Assignee, Created Date, Actions
- Task rows with proper data display
- Delete button for each task with confirmation
- Status badge styling (different colors per status)
- Empty state when no tasks match filters
- Loading state handling
```

### Step 11c: Task Form Component
```
Create an AddTaskForm component with:
- Input fields: title (required), description (optional)
- Status dropdown with valid status values
- Assignee dropdown populated from users API
- Form validation with error display
- Submit handler that calls API and refreshes task list
- Reset form after successful submission
- Add data-testid attributes on all interactive elements
```

## Step 19 Expanded: Custom Test Fixtures

### Step 19a: Base Fixture Setup
```
Create src/fixtures/base.fixture.ts with:
- Import base test and expect from @playwright/test
- Create custom test fixture that extends base test
- Add apiContext fixture using request.newContext()
- Configure base URL from environment config
- Export custom test and expect for use in test files
```

### Step 19b: Authenticated API Context
```
Add authedApiContext fixture to base.fixture.ts:
- Use apiContext to perform login request
- Store session cookies from login response
- Create new context with authentication cookies
- Provide helper method to get current user info
- Handle authentication failures gracefully
```

### Step 19c: Fixture Typing
```
Add proper TypeScript types for custom fixtures:
- Define fixture interfaces for apiContext and authedApiContext
- Export typed test function with custom fixtures
- Ensure proper IntelliSense support in test files
- Add JSDoc comments for fixture documentation
```

## Step 14 Expanded: Dashboard Page Object

> **Attach**: `../qe-playground/client/src/pages/DashboardPage.jsx`, `../qe-playground/client/src/components/TaskForm.jsx`

### Step 14a: Dashboard Locators
```
Create src/pages/dashboard.page.ts. Discover the actual locators by
inspecting the attached DashboardPage.jsx and TaskForm.jsx source files.
Use getByTestId first, then getByRole, getByLabel, etc.
```

### Step 14b: Dashboard Actions & Assertions
```
Add action and assertion methods to DashboardPage class based on the
user interactions supported by the attached components. Wrap all
locator interactions in descriptive async methods.
```

## Step 16 Expanded: Tasks API Tests

> **Attach**: `../qe-playground/server/src/routes/tasks.js`, `../qe-playground/server/src/store.js`

### Step 16a: Discover API Contract
```
Inspect the attached tasks route and store files. Identify all
endpoints, required fields, query params, validation schemas,
status codes, and response shapes.
```

### Step 16b: Write Comprehensive Tests
```
Create tests/api/tasks.spec.ts covering all CRUD operations,
query parameter filtering, and error scenarios discovered from
the attached source. Use apiContext and authedApiContext fixtures.
```

## Step 17 Expanded: Amazon Q Rules & Documentation

### Step 17a: Framework Rules
```
Create .amazonq/rules/playwright-conventions.md with:
- Import patterns for tests and page objects
- Naming conventions for test files and methods
- Page object patterns and base class usage
- API test patterns with fixtures
- Code style guidelines (async/await, locators, assertions)
```

### Step 17b: Project README
```
Create README.md with:
- Prerequisites and setup instructions
- How to run tests (all scripts)
- Environment configuration
- Project structure overview
- Framework patterns summary
```