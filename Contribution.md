# Contributing to SQL Studio

Thank you for your interest in contributing. This guide will help you get the project running locally and explain how to submit your changes.

All skill levels are welcome. If you are contributing to an open source project for the first time, this is a good place to start.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
- [Project Structure](#project-structure)
- [Open Features to Build](#open-features-to-build)
- [How to Submit a Contribution](#how-to-submit-a-contribution)
- [Code Style Guidelines](#code-style-guidelines)
- [Reporting Bugs](#reporting-bugs)

---

## Project Overview

CipherSQL Studio is a browser-based SQL practice platform. Users sign up, browse assignments, write SQL queries in a Monaco editor, run them against a real PostgreSQL sandbox, and track their progress.

- **Frontend**: React 19 + Vite, SCSS, Monaco Editor
- **Backend**: Node.js + Express 5, MongoDB (users/progress), PostgreSQL on Neon (SQL sandbox)
- **Live site**: https://sqlstudio.sapnendra.tech

---

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | React 19, Vite, SCSS, React Router v7 |
| Backend | Node.js, Express 5 |
| SQL Database | PostgreSQL (Neon — serverless) |
| NoSQL Database | MongoDB Atlas |
| Editor | Monaco Editor (`@monaco-editor/react`) |
| Auth | JWT + bcrypt |
| Hosting | Vercel (frontend), Render (backend) |

---

## Local Setup

### 1. Fork and clone the repo

```bash
git clone https://github.com/<your-username>/ciphersql-studio.git
cd ciphersql-studio
```

### 2. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Set up environment variables

**`backend/.env`**
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ciphersqlstudio
POSTGRES_URI=postgresql://<neon-user>:<neon-password>@<host>.neon.tech/neondb?sslmode=require
JWT_SECRET=any_long_random_string
OPENAI_API_KEY=sk-your-key     # optional — hints still work without it
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

> For PostgreSQL you can use a free [Neon](https://neon.tech) project. Create one, copy the pooled connection string, and run the setup script:
> ```bash
> psql "<your-neon-connection-string>" < backend/src/db/setup.sql
> ```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed MongoDB assignments

```bash
cd backend
npm run seed
```

### 5. Start the app

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

Open http://localhost:5173

---

## Project Structure

```
CipherSQLStudio/
├── backend/
│   ├── server.js
│   └── src/
│       ├── controllers/     # Route handlers
│       ├── routes/          # Express routers
│       ├── models/          # Mongoose models
│       ├── middleware/      # Auth, error handler
│       ├── db/              # mongo.js, postgres.js, setup.sql
│       └── utils/           # sqlValidator.js, jwt.js, seedAssignments.js
│
└── frontend/
    └── src/
        ├── components/      # All UI components
        ├── pages/           # Route-level page components
        ├── hooks/           # Custom React hooks
        ├── services/        # api.js (all axios calls)
        ├── context/         # AuthContext
        └── styles/          # SCSS design system
```

---

## Open Features to Build

Pick any one of these and open a pull request. If you want to work on something not listed, open an issue first to discuss it.

### Beginner Friendly

| # | Feature | Where to work |
|---|---------|---------------|
| 1 | **Add more SQL assignments** | `backend/src/utils/seedAssignments.js` - add objects to the array, run `npm run seed` |
| 2 | **Keyboard shortcuts popup** | New `KeyboardShortcuts` component, triggered by a `?` button in the workspace toolbar |
| 3 | **Improve error messages** | `frontend/src/components/SQLWorkspace/SQLWorkspace.jsx` - catch specific SQL error codes and show friendlier text |
| 4 | **Copy query button** | Add a copy-to-clipboard icon button in the editor toolbar |

### Intermediate

| # | Feature | Where to work |
|---|---------|---------------|
| 6 | **Dark / Light theme toggle** | `frontend/src/styles/variables.scss` + a `ThemeToggle` component that swaps a class on `<html>` |
| 7 | **Query history panel** | Store last N queries in `localStorage`, show in a slide-out panel in the workspace |
| 8 | **Execution timer** | Show how many milliseconds the query took — the backend already returns timing, just display it |
| 9 | **Better mobile workspace layout** | `frontend/src/styles/layout.scss` — the workspace stacks editor + results vertically on small screens |
| 10 | **Filter assignments by completion** | Add a "Completed / Not started" filter tab on the assignments page |

### Advanced

| # | Feature | Where to work |
|---|---------|---------------|
| 11 | **Leaderboard page** | New `/leaderboard` route, new backend endpoint aggregating progress counts per user |
| 12 | **Share solution as public link** | Generate a read-only token-based URL for a saved query |
| 13 | **Backend API tests** | Use Jest + Supertest inside `backend/` to test auth and query routes |
| 14 | **Reset progress button** | Allow users to clear progress for a single assignment from the workspace |
| 15 | **Admin panel for adding assignments** | A protected `/admin` route that lets the owner add/edit assignments without touching the seed file |

---

## How to Submit a Contribution

1. **Fork** the repository on GitHub
2. **Create a branch** with a descriptive name:
   ```bash
   git checkout -b feature/query-history
   ```
3. **Make your changes** and commit with a clear message:
   ```bash
   git commit -m "feat: add query history panel to workspace"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/query-history
   ```
5. **Open a Pull Request** on GitHub against the `main` branch
   - Describe what you built and why
   - Include a screenshot if it is a UI change
   - Link the issue number if one exists (e.g. `Closes #12`)

That is it. I will review and merge it as soon as possible.

---

## Code Style Guidelines

- **JavaScript**: use `const`/`let`, arrow functions, async/await. No `var`.
- **React**: functional components only. Keep components small and focused.
- **SCSS**: follow the existing BEM naming pattern (`block__element--modifier`). Use `var(--color-*)` tokens, do not hard-code colours.
- **Commits**: use conventional commit prefixes — `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`
- **No new dependencies without discussion** — open an issue first if you need to add a package.

---

## Reporting Bugs

If you find a bug:

1. Open a [GitHub Issue](https://github.com/sapnendra/ciphersql-studio/issues/new)
2. Include:
   - What you did
   - What you expected to happen
   - What actually happened
   - A screenshot if possible
   - Your browser and OS

---

*Built and maintained by [Sapnendra Jaiswal](https://github.com/sapnendra)*
