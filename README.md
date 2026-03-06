# CipherSQLStudio

A browser-based SQL learning sandbox where students practice SQL queries against pre-configured assignments.

```
User → Login/Signup → Browse Assignments → Open Workspace
     → Write SQL → Execute Query → See Results → Get AI Hint
```

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React + Vite, Monaco Editor, SCSS |
| Backend    | Node.js, Express.js               |
| SQL DB     | PostgreSQL (sandboxed execution)  |
| NoSQL DB   | MongoDB Atlas (assignments + users)|
| AI Hints   | OpenAI GPT-3.5                    |
| Auth       | JWT + bcrypt                      |

---

## Architecture

```
┌─────────────────────────────────────┐
│           React Frontend            │
│  (Monaco Editor + SCSS Design System│
└────────────────┬────────────────────┘
                 │ HTTP / REST API
┌────────────────▼────────────────────┐
│         Express.js Backend          │
│  /api/auth  /api/assignments        │
│  /api/query /api/hint /api/progress │
└────┬──────────────────────┬─────────┘
     │                      │
┌────▼──────┐        ┌──────▼──────┐
│ MongoDB   │        │ PostgreSQL  │
│ Assignments│       │ Sandboxed   │
│ Users     │        │ Schemas     │
│ Progress  │        │             │
└───────────┘        └─────────────┘
                             │
                    ┌────────▼──────┐
                    │  OpenAI API   │
                    │  (Hints only) │
                    └───────────────┘
```

---

## Data Flow: Query Execution

```
User types SQL in Monaco Editor
         ↓
Ctrl+Enter / Run Query button
         ↓
React POST /api/query/execute
         ↓
Backend: Validate SQL (SELECT only)
         ↓
Reject if DROP/ALTER/DELETE detected
         ↓
Set search_path to assignment schema
         ↓
Set statement_timeout = 5000ms
         ↓
PostgreSQL executes query in sandbox
         ↓
{ success, rows, fields, rowCount }
         ↓
React updates QueryResults component
         ↓
Results table rendered
```

---

## Project Structure

```
CipherSQLStudio/
├── backend/
│   ├── server.js
│   └── src/
│       ├── controllers/       # authController, assignmentController...
│       ├── routes/            # authRoutes, assignmentRoutes...
│       ├── middleware/        # auth.js, errorHandler.js
│       ├── models/            # User, Assignment, UserProgress
│       ├── services/
│       ├── db/                # mongo.js, postgres.js, setup.sql
│       ├── utils/             # jwt.js, sqlValidator.js, seedAssignments.js
│       └── config/
│
└── frontend/
    └── src/
        ├── components/        # AssignmentCard, SQLWorkspace, etc.
        ├── pages/             # HomePage, LoginPage, AssignmentsPage...
        ├── hooks/             # useAssignments.js
        ├── services/          # api.js (axios client)
        ├── context/           # AuthContext.jsx
        └── styles/            # SCSS design system
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (optional, hints fallback to generic message)

---

### 1. Clone and install

```bash
git clone <repo-url>
cd CipherSQLStudio

# Install backend
cd backend && npm install

# Install frontend
cd ../frontend && npm install
```

---

### 2. Configure Environment Variables

**Backend** — create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ciphersqlstudio
POSTGRES_URI=postgresql://user:password@localhost:5432/ciphersqlstudio
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=sk-your-openai-api-key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**Frontend** — create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Set up PostgreSQL

Create the database and run the setup script:

```bash
createdb ciphersqlstudio
psql ciphersqlstudio < backend/src/db/setup.sql
```

This creates all sandbox schemas and seeds sample data:
- `assignment_users`
- `assignment_products`
- `assignment_employees`
- `assignment_customers`
- `assignment_orders`
- `assignment_sales`

---

### 4. Seed MongoDB Assignments

```bash
cd backend
npm run seed
```

Seeds **30 assignments** across Easy, Medium, and Hard difficulties.

---

### 5. Start the Application

**Backend** (development):
```bash
cd backend
npm run dev
```

**Frontend** (development):
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Reference

### Authentication
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /api/auth/signup   | Register new user   |
| POST   | /api/auth/login    | Login user, get JWT |
| GET    | /api/auth/me       | Get current user    |

### Assignments
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/assignments      | List all (paginated)     |
| GET    | /api/assignments/:id  | Get single assignment    |

Query params: `?page=1&limit=12&difficulty=Easy&search=join`

### Query Execution
| Method | Endpoint             | Auth | Description              |
|--------|----------------------|------|--------------------------|
| POST   | /api/query/execute   | ✓    | Execute SQL in sandbox   |

### AI Hints
| Method | Endpoint   | Auth | Description         |
|--------|------------|------|---------------------|
| POST   | /api/hint  | ✓    | Get AI learning hint |

### Progress
| Method | Endpoint                    | Auth | Description              |
|--------|-----------------------------|------|--------------------------|
| GET    | /api/progress               | ✓    | All user progress        |
| POST   | /api/progress               | ✓    | Save/update progress     |
| GET    | /api/progress/:assignmentId | ✓    | Progress for assignment  |

---

## Security

- **SQL Validation**: Only `SELECT` and `WITH` (CTE) allowed. `DROP`, `ALTER`, `DELETE`, `TRUNCATE`, `CREATE`, `INSERT`, `UPDATE` are all blocked.
- **Schema Isolation**: Each assignment uses a dedicated PostgreSQL schema via `SET search_path`.
- **Statement Timeout**: 5-second timeout prevents long-running queries.
- **Comment Blocking**: `--` and `/*` SQL comments are rejected to prevent injection.
- **Statement Stacking**: Multiple statements separated by `;` are rejected.
- **Rate Limiting**: 100 req/15min globally, 5 req/min on hint endpoint.
- **Helmet**: Security headers applied to all responses.

---

## SCSS Design System

```
styles/
├── variables.scss   # Colors, spacing, breakpoints, typography
├── mixins.scss      # Responsive, flex, card, button, scrollbar mixins
├── base.scss        # CSS reset, global defaults
├── layout.scss      # Page layouts, workspace grid, section headers
└── components/
    ├── buttons.scss  # .btn with BEM modifiers
    ├── cards.scss    # .assignment-card, .panel-card
    ├── editor.scss   # .sql-editor
    └── tables.scss   # .results-table, .sample-table
```

Breakpoints: `320px | 641px | 1024px | 1281px` (mobile-first)

---

## Tech Stack Justification

| Choice | Reason |
|--------|--------|
| **React + Vite** | Fast HMR, excellent ecosystem, component architecture |
| **Monaco Editor** | Same engine as VSCode, SQL syntax highlighting, keyboard shortcuts |
| **SCSS** | Variables, mixins, nesting make design systems maintainable |
| **PostgreSQL** | Schema-based isolation perfect for per-assignment sandboxes |
| **MongoDB** | Flexible document schema ideal for varied assignment layouts |
| **JWT** | Stateless, scalable authentication |
| **OpenAI** | Best-in-class instructional hint generation |
