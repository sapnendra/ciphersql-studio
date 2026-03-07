# CipherSQL Studio

> A premium browser-based SQL learning sandbox where developers practice real SQL queries against a live PostgreSQL environment - no setup required.

**Designed & Developed by [Sapnendra Jaiswal](https://github.com/sapnendra)**

---

## Overview

```
User → Login/Signup → Browse Assignments → Open Workspace
     → Write SQL in Monaco Editor → Run Query → See Live Results
     → Get AI Hint → Track Attempts → Mark Complete
```

CipherSQL Studio provides a full developer-grade SQL practice environment: 30+ curated assignments across Easy / Medium / Hard difficulties, a VSCode-quality Monaco editor, sandboxed PostgreSQL schemas, OpenAI-powered hints, and persistent progress tracking - all behind a polished dark UI.

---

## Tech Stack

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| @monaco-editor/react | 4.7 | VSCode-quality SQL editor |
| SCSS (Sass) | 1.97 | Design system & component styles |
| lucide-react | 0.577 | Icon library |
| framer-motion | 12 | Animation primitives |
| react-hot-toast | 2.6 | Toast notifications |
| axios | 1.13 | HTTP client |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| Express | 5 | HTTP framework |
| Mongoose | 9 | MongoDB ODM |
| pg | 8.20 | PostgreSQL client |
| jsonwebtoken | 9 | JWT auth tokens |
| bcryptjs | 3 | Password hashing |
| openai | 6 | AI hint generation |
| helmet | 8 | Security headers |
| express-rate-limit | 8 | Rate limiting |
| dotenv | 17 | Environment config |
| cors | 2.8 | Cross-origin requests |

### Infrastructure

| Layer | Technology |
|-------|------------|
| SQL Database | PostgreSQL 14+ - sandboxed per-assignment schemas |
| NoSQL Database | MongoDB Atlas - assignments, users, progress |
| AI | OpenAI GPT-3.5 - contextual SQL learning hints |
| Auth | JWT + bcrypt - stateless, scalable |

---

## Architecture

```
┌──────────────────────────────────────────┐
│            React 19 Frontend             │
│  Monaco Editor · SCSS Design System      │
│  Framer Motion · React Router v7         │
└──────────────────┬───────────────────────┘
                   │ REST API (axios)
┌──────────────────▼───────────────────────┐
│           Express 5 Backend              │
│  /api/auth  /api/assignments             │
│  /api/query /api/hint /api/progress      │
│  Helmet · Rate Limit · JWT Middleware    │
└────┬──────────────────────┬──────────────┘
     │                      │
┌────▼──────┐        ┌──────▼──────────┐
│  MongoDB  │        │   PostgreSQL    │
│ Atlas     │        │  Sandboxed      │
│ Users     │        │  Schemas        │
│ Assignments        │  (6 schemas)    │
│ Progress  │        │                 │
└───────────┘        └────────┬────────┘
                              │
                     ┌────────▼────────┐
                     │   OpenAI API    │
                     │  (Hints only)   │
                     └─────────────────┘
```

---

## Data Flow: Query Execution

```
User types SQL in Monaco Editor
         ↓
Ctrl+Enter  or  Run Query button
         ↓
POST /api/query/execute  { assignmentId, query }
         ↓
SQL Validator: allow SELECT / WITH (CTE) only
         ↓
Reject DROP · ALTER · DELETE · INSERT · UPDATE
         ↓
Reject comment injection  (-- · /* */)
         ↓
Reject stacked statements  (multiple ;)
         ↓
SET search_path = assignment_<schema>
SET statement_timeout = 5000ms
         ↓
PostgreSQL executes in isolated sandbox
         ↓
{ success, rows, fields, rowCount, duration }
         ↓
QueryResults component renders table
         ↓
Attempt count incremented + progress saved
```

---

## Features

- **30+ SQL Assignments** - Easy, Medium, Hard - covering SELECT, JOINs, aggregations, CTEs, subqueries, window functions
- **Monaco Editor** - VSCode-quality editor with SQL syntax highlighting, Ctrl+Enter shortcut, autocomplete for SQL keywords, smooth caret animation
- **Live PostgreSQL Sandbox** - Queries execute against real data across 6 pre-seeded schemas
- **AI Hints** - Contextual hints via OpenAI GPT-3.5 that guide without giving away the answer
- **Attempt Counter** - Tracks how many times you've run a query per assignment; persists across sessions
- **Progress Persistence** - Last query, completion status, and attempt count saved to MongoDB per user per assignment
- **Animated Loading Screen** - Hex logo spinner, progress bar, cycling messages
- **Debounced Search** - Assignments search triggers 300ms after typing stops
- **Per-page SEO** - Dynamic `<title>` and `<meta description>` per route via `useMeta` hook
- **Responsive Design** - Mobile-first SCSS breakpoints: 320 / 641 / 1024 / 1281px
- **CSS Custom Properties** - All colors exposed as `var(--color-*)` tokens for runtime theming

---

## Project Structure

```
CipherSQLStudio/
├── backend/
│   ├── server.js
│   └── src/
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── assignmentController.js
│       │   ├── queryController.js
│       │   ├── hintController.js
│       │   └── progressController.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── assignmentRoutes.js
│       │   ├── queryRoutes.js
│       │   ├── hintRoutes.js
│       │   └── progressRoutes.js
│       ├── middleware/
│       │   ├── auth.js            # JWT verification
│       │   └── errorHandler.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Assignment.js
│       │   └── UserProgress.js    # attemptCount, isCompleted, lastQuery
│       ├── db/
│       │   ├── mongo.js
│       │   ├── postgres.js
│       │   └── setup.sql          # Schema + seed data
│       └── utils/
│           ├── sqlValidator.js    # SELECT-only enforcement
│           ├── jwt.js
│           └── seedAssignments.js
│
└── frontend/
    ├── public/
    │   ├── favicon.svg            # Hex + database icon (orange gradient)
    │   ├── apple-touch-icon.svg
    │   └── site.webmanifest
    └── src/
        ├── components/
        │   ├── Navbar/            # Gradient logo, avatar pill, CTA
        │   ├── Footer/            # 4-col layout, credit, tech badges
        │   ├── LoadingScreen/     # Hex spinner, progress bar, messages
        │   ├── SQLWorkspace/      # Editor + actions + results layout
        │   ├── SQLEditor/         # Monaco wrapper (full-height, flex)
        │   ├── QueryResults/      # Results table
        │   ├── QuestionPanel/     # Assignment description
        │   ├── SampleDataViewer/  # Schema preview
        │   ├── AssignmentCard/    # Card with difficulty badge
        │   └── HintBox/           # AI hint trigger + display
        ├── pages/
        │   ├── HomePage.jsx       # Hero · Features · Demo · Assignments preview
        │   ├── LoginPage.jsx
        │   ├── SignupPage.jsx
        │   ├── AssignmentsPage.jsx # Debounced search, difficulty filter, pagination
        │   └── WorkspacePage.jsx  # Breadcrumb + SQLWorkspace
        ├── hooks/
        │   ├── useAssignments.js
        │   └── useMeta.js         # Per-page <title> + <meta description>
        ├── services/
        │   └── api.js             # axios client, JWT interceptor, all API helpers
        ├── context/
        │   └── AuthContext.jsx
        └── styles/
            ├── variables.scss     # Colors, spacing, typography, breakpoints
            ├── mixins.scss        # flex, gradient-text, glow, glass-card, scrollbar
            ├── base.scss          # CSS reset, :root tokens, body::before grid
            ├── layout.scss        # Page, auth, workspace, assignments layouts
            ├── animations.scss    # fadeIn, floatY, spinSlow, glowPulse, shimmer
            └── components/
                ├── buttons.scss
                ├── cards.scss
                ├── editor.scss
                └── tables.scss
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (optional - hints fall back to a generic message)

---

### 1. Clone & Install

```bash
git clone https://github.com/sapnendra/CipherSQLStudio.git
cd CipherSQLStudio

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

---

### 2. Environment Variables

**`backend/.env`**
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ciphersqlstudio
POSTGRES_URI=postgresql://user:password@localhost:5432/ciphersqlstudio
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=sk-your-openai-api-key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Set up PostgreSQL

```bash
createdb ciphersqlstudio
psql ciphersqlstudio < backend/src/db/setup.sql
```

Creates and seeds 6 isolated schemas:

| Schema | Tables |
|--------|--------|
| `assignment_users` | users |
| `assignment_products` | products, categories |
| `assignment_employees` | employees, departments |
| `assignment_customers` | customers |
| `assignment_orders` | orders, order_items |
| `assignment_sales` | sales, regions |

---

### 4. Seed MongoDB Assignments

```bash
cd backend
npm run seed
```

Seeds **30 assignments** across Easy / Medium / Hard.

---

### 5. Start the Application

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | — | Register new user |
| POST | `/api/auth/login` | — | Login, receive JWT |
| GET | `/api/auth/me` | ✓ | Get current user |

### Assignments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/assignments` | — | List all (paginated) |
| GET | `/api/assignments/:id` | — | Get single assignment |

Query params: `?page=1&limit=12&difficulty=Easy&search=join`

### Query Execution
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/query/execute` | ✓ | Execute SQL in sandbox |

### AI Hints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/hint` | ✓ | Get contextual AI hint |

### Progress
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/progress` | ✓ | All progress for current user |
| POST | `/api/progress` | ✓ | Save / update progress (upsert) |
| GET | `/api/progress/:assignmentId` | ✓ | Progress for one assignment |

---

## Security

| Measure | Detail |
|---------|--------|
| **SQL Validation** | Only `SELECT` and `WITH` (CTE) allowed |
| **Blocked keywords** | `DROP · ALTER · DELETE · TRUNCATE · CREATE · INSERT · UPDATE` |
| **Comment injection** | `--` and `/* */` are rejected |
| **Statement stacking** | Multiple `;`-separated statements rejected |
| **Schema isolation** | `SET search_path` scopes each query to its assignment schema |
| **Statement timeout** | `5000ms` hard limit on every query |
| **Rate limiting** | 100 req / 15 min globally; 5 req / min on `/api/hint` |
| **Helmet** | HTTP security headers on all responses |
| **JWT** | Short-lived tokens; 401 triggers auto-logout on the client |

---

## SCSS Design System

```
styles/
├── variables.scss    # Color tokens, spacing scale, breakpoints, shadows
├── mixins.scss       # flex(), gradient-text, glow, glass-card, custom-scrollbar
├── base.scss         # CSS reset · :root token map · body::before grid texture
├── layout.scss       # .page, .auth-layout, .workspace-layout, .assignments-grid
├── animations.scss   # fadeIn, fadeInUp, floatY, spinSlow, glowPulse, shimmer
└── components/
    ├── buttons.scss  # .btn, .btn--primary/secondary/ghost/success/danger/sm/lg
    ├── cards.scss    # .assignment-card, .panel-card
    ├── editor.scss   # .sql-editor (Monaco wrapper)
    └── tables.scss   # .results-table, .sample-table
```

**Color palette** (Orange Dark — BookExpert theme):

| Token | Value | Usage |
|-------|-------|-------|
| `$color-bg` | `#0A0500` | Page background |
| `$color-primary` | `#FF5500` | CTA buttons, accents |
| `$color-primary-end` | `#FF8C00` | Gradient endpoint |
| `$color-heading` | `#FFFFFF` | Headings |
| `$color-body` | `#EDD9C8` | Body text (warm cream) |
| `$color-muted` | `#8A7060` | Secondary text |
| `$color-secondary` | `#22C55E` | Success / Mark Complete |

All tokens are also exposed as CSS custom properties (`var(--color-*)`) enabling runtime theme switching.

**Breakpoints** (mobile-first): `320px · 641px · 1024px · 1281px`

---

## Technology Choices - Explained

### React 19 + Vite 7

React's component model maps directly to the workspace's UI: the editor, results table, hint panel, and question panel are all independent units that re-render only when their own state changes. React 19's concurrent rendering means the Monaco editor can load in the background without blocking the rest of the page. Vite was chosen over Create-React-App or Webpack because its native ESM dev server starts in under 300ms regardless of project size - HMR updates reach the browser in single-digit milliseconds, which dramatically speeds up iterating on SCSS.

### Monaco Editor (`@monaco-editor/react`)

Monaco is the editor engine that powers VSCode. Alternatives like CodeMirror or simple `<textarea>` were considered, but Monaco was chosen because: (1) it ships with first-class SQL syntax highlighting and tokenisation, (2) its `addCommand` API lets us bind Ctrl+Enter natively without hacking key events, (3) `automaticLayout: true` makes it responsive inside flex containers for free, and (4) it provides a professional feel that reinforces the "real developer tool" goal of the platform.

### SCSS + CSS Custom Properties

Plain CSS would require duplicating variables everywhere; CSS-in-JS (Styled Components, Emotion) adds runtime overhead and complicates SSR. SCSS gives compile-time variables, nesting, and mixins that keep the 40+ component styles consistent. On top of that, all design tokens are re-exported as CSS custom properties (`var(--color-primary)`, etc.) in `:root`. This two-layer approach means SCSS handles static compilation while CSS vars handle runtime theme switching - swapping the entire colour palette requires changing one class on `<html>` with no rebuild.

### PostgreSQL - Schema Isolation Model

The sandbox requirement is the most important architectural constraint in the project. Each assignment runs in its own PostgreSQL schema (e.g. `assignment_products`, `assignment_employees`). By setting `SET search_path = assignment_<name>` per request, the same database server hosts all assignments with zero cross-contamination - a student writing `SELECT * FROM products` always reads the right dataset. Alternatives like individual databases per assignment would be unmanageable; row-level isolation with a shared table would require complex filtering in every query. The schema model is the right primitive for this use case.

### MongoDB - Document Model for Assignments

SQL assignments are not uniform: some have 2 sample tables, others have 5; some have hints, some do not; difficulty metadata, expected output, and question text all vary. Forcing this into a relational schema would mean nullable columns everywhere or an EAV anti-pattern. MongoDB's flexible document model lets each assignment carry exactly the fields it needs. User progress (`attemptCount`, `sqlQuery`, `isCompleted`, `lastAttempt`) similarly fits a document - one document per user/assignment pair, upserted atomically with `$inc` on each run.

### Express 5

Express was chosen over Fastify or Koa because the team's familiarity and the ecosystem maturity outweigh Fastify's raw throughput advantage at this scale. Express 5 (the current stable release) natively propagates async errors to the error handler without needing `express-async-errors` wrappers, removes the need for `next(err)` boilerplate in every `try/catch`, and keeps the route files clean. The entire API fits in under 10 routes, so a framework with more structure (NestJS, etc.) would be over-engineering.

### JWT Authentication

Session-based auth requires server-side storage (Redis, DB) and sticky sessions in a multi-instance deployment. JWT encodes the user payload in the token itself, so any instance can verify a request without a round-trip to a session store. The token is stored in `localStorage` and attached as a `Bearer` header by an axios interceptor. A global 401 interceptor clears the token and redirects to `/login` if it expires, giving automatic logout without any server-side session invalidation logic.

### OpenAI for Hints

The hint feature is deliberately constrained: it receives the question text, user's current query, and schema context, then returns a nudge - not the answer. OpenAI's GPT-3.5-turbo was chosen over a rule-based hint system because SQL has too many valid ways to solve each problem for static hints to be useful. The endpoint is rate-limited to 5 requests/minute to control costs. If the API key is absent, the controller falls back to a generic hint message - so the app remains fully functional without an OpenAI subscription.

---

## License

MIT - built for learning. Feel free to fork and extend.

---

*Designed & Developed by [Sapnendra Jaiswal](https://github.com/sapnendra)*
