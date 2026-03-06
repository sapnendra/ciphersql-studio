# CipherSQLStudio — Testing Guide

## Prerequisites

Ensure both servers are running before testing:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open **http://localhost:5173** in a browser.

---

## 1. Authentication

### 1.1 Signup
| Step | Action | Expected |
|------|--------|----------|
| 1 | Go to `/signup` | Signup form renders |
| 2 | Submit empty form | Browser validates required fields |
| 3 | Enter name, valid email, password → Submit | Redirected to `/assignments`, success toast "Account created!" |
| 4 | Try signing up with same email again | Toast "User already exists" or similar error |

### 1.2 Login
| Step | Action | Expected |
|------|--------|----------|
| 1 | Go to `/login` | Login form renders |
| 2 | Enter wrong password | Toast error shown |
| 3 | Enter correct credentials | Redirected to `/assignments`, navbar shows username + Logout |
| 4 | Refresh page | Still logged in (JWT persists in localStorage) |

### 1.3 Logout
| Step | Action | Expected |
|------|--------|----------|
| 1 | Click Logout in navbar | Redirected to `/`, localStorage cleared |
| 2 | Visit `/assignments` directly | Redirected to `/login` |

---

## 2. Assignments Page (`/assignments`)

### 2.1 Listing
| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in and go to `/assignments` | Grid of assignment cards loads |
| 2 | Check total count badge (top right) | Should show "30 assignments" |
| 3 | Scroll to bottom | Pagination shows Page 1 of 3 (12 per page) |

### 2.2 Filters
| Step | Action | Expected |
|------|--------|----------|
| 1 | Click **Easy** difficulty filter | Only Easy assignments shown |
| 2 | Click **Medium** | Only Medium assignments shown |
| 3 | Click **Hard** | Only Hard assignments shown |
| 4 | Click **All** | All assignments shown |
| 5 | Type "user" in search and submit | Assignments with "user" in title/description |
| 6 | Clear search, submit empty | All assignments return |

### 2.3 Pagination
| Step | Action | Expected |
|------|--------|----------|
| 1 | Click **Next** | Page 2 loads |
| 2 | Click **← Prev** | Back to page 1, button disabled |
| 3 | Go to last page | "Next" button disabled |

---

## 3. Workspace Page (`/assignments/:id`)

Open any assignment card → clicks to workspace.

### 3.1 Layout
| Element | Expected |
|---------|----------|
| Left panel | Shows difficulty badge, title, description, question, sample data table |
| Right panel | Monaco editor with default query, Run Query + Get Hint + Mark Complete buttons |
| Sample data | Columns shown with data types; 3–5 preview rows |

### 3.2 Query Execution — Happy Path
| Step | Action | Expected |
|------|--------|----------|
| 1 | Clear editor, type `SELECT * FROM users;` | Query appears with syntax highlighting |
| 2 | Click **Run Query** | Button shows loading spinner |
| 3 | Results appear | "N rows returned" in green, table with data |
| 4 | Row count label | Matches actual number of rows in results table |
| 5 | Press **Ctrl+Enter** | Same as clicking Run Query |

### 3.3 Query Execution — Error Cases
| Query | Expected Error |
|-------|---------------|
| `DROP TABLE users;` | "Only SELECT and WITH queries are allowed." |
| `DELETE FROM users;` | "Only SELECT and WITH queries are allowed." |
| `SELECT * FROM nonexistent_table;` | "SQL Error: relation 'nonexistent_table' does not exist" |
| `SELECT 1/0;` | SQL division by zero error |
| Blank query | Toast: "Please write a query first." |

### 3.4 Complex Queries
Test these on assignments that use the corresponding schema:

```sql
-- assignment_users schema
SELECT name, age FROM users WHERE age > 30;
SELECT COUNT(*) FROM users;
SELECT name FROM users ORDER BY age DESC LIMIT 3;

-- assignment_employees schema  
SELECT name, department, salary FROM employees WHERE salary > 4000;
SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department;

-- assignment_orders schema
SELECT o.id, c.name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id;
```

### 3.5 Mark Assignment Complete
| Step | Action | Expected |
|------|--------|----------|
| 1 | Click **Mark Complete** without running query | Toast: "Run your query successfully before marking as complete." |
| 2 | Run a query successfully | Results table appears |
| 3 | Click **Mark Complete** | Toast: "Assignment marked as complete! 🎉", button turns green and shows "Completed" |
| 4 | Button is now disabled | Cannot mark complete again |

### 3.6 AI Hints
| Step | Action | Expected |
|------|--------|----------|
| 1 | Click **Get Hint** | Loading state on button |
| 2 | Hint appears | Yellow hint box with lightbulb icon, 2-4 sentence guidance |
| 3 | Hint does **not** contain the full answer | Just guidance/concepts |
| 4 | Click **✕** on hint box | Hint dismissed |
| 5 | If OpenAI quota exceeded | Fallback hint shown with note "AI quota reached — showing a general hint." |

---

## 4. Navigation & Routes

| Route | Auth Required | Expected |
|-------|--------------|----------|
| `/` | No | Home page with hero + feature cards |
| `/login` | No (redirect if logged in) | Login form |
| `/signup` | No (redirect if logged in) | Signup form |
| `/assignments` | Yes | Assignment listing |
| `/assignments/:id` | Yes | Workspace for that assignment |
| `/unknown-route` | — | 404 or redirect |

---

## 5. Responsive Design

Test at these breakpoints (use DevTools):

| Breakpoint | Test |
|------------|------|
| 320px (mobile) | Navbar collapses to hamburger menu; workspace stacks vertically |
| 641px (small tablet) | Layout transitions |
| 1024px (tablet) | Two-column workspace layout appears |
| 1440px (desktop) | Full layout, wider content |

**Hamburger menu test:**
1. Resize to < 641px
2. Click hamburger icon → nav links slide in
3. Click **X** → menu closes

---

## 6. Security / SQL Sandboxing

Verify blocked statements return errors (not executions):

```sql
DROP TABLE users;
ALTER TABLE users ADD COLUMN test TEXT;
INSERT INTO users VALUES (99, 'hacker', 'x@x.com', 0);
UPDATE users SET name = 'hacked' WHERE 1=1;
DELETE FROM users;
TRUNCATE users;
CREATE TABLE evil (id INT);
-- comment injection
SELECT * FROM users; DROP TABLE users;
```

All of the above should return a `400` error with message: *"Only SELECT and WITH queries are allowed."*

---

## 7. API Endpoints (via curl or Postman)

Replace `<TOKEN>` with the JWT from signup/login response.

```bash
# Auth - Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'

# Auth - Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Assignments - List
curl http://localhost:5000/api/assignments \
  -H "Authorization: Bearer <TOKEN>"

# Assignments - Single
curl http://localhost:5000/api/assignments/<ASSIGNMENT_ID> \
  -H "Authorization: Bearer <TOKEN>"

# Query Execute
curl -X POST http://localhost:5000/api/query/execute \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"assignmentId":"<ASSIGNMENT_ID>","query":"SELECT * FROM users;"}'

# Hint
curl -X POST http://localhost:5000/api/hint \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"question":"Select all users","userQuery":"SELECT","schema":"Table: users\n( id INTEGER, name TEXT )"}'

# Progress - Save
curl -X POST http://localhost:5000/api/progress \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"assignmentId":"<ASSIGNMENT_ID>","sqlQuery":"SELECT * FROM users;","isCompleted":true}'

# Progress - Get
curl http://localhost:5000/api/progress/<ASSIGNMENT_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 8. Database Verification

```bash
# Check PostgreSQL schemas exist
PGPASSWORD='Sapnendra123' psql -U Sapnendra -h localhost -d ciphersqlstudio -c "\dn"

# Check tables in a schema
PGPASSWORD='Sapnendra123' psql -U Sapnendra -h localhost -d ciphersqlstudio \
  -c "SET search_path TO assignment_users; SELECT * FROM users LIMIT 3;"

# Check MongoDB assignments count
cd backend && node -e "
require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('./src/models/Assignment');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const count = await Assignment.countDocuments();
  console.log('Assignments in DB:', count);
  mongoose.disconnect();
});"
```

---

## 9. Known Limitations

| Item | Note |
|------|------|
| AI Hints | Requires OpenAI API credits; falls back to generic hints on 429 |
| PostgreSQL | Must be running locally (`sudo systemctl start postgresql`) |
| JWT Expiry | Token expires in 7d; re-login required after expiry |
| Query timeout | Queries exceeding 5 seconds are killed by PostgreSQL |
| No row limit | `SELECT *` on large tables returns all rows — use `LIMIT` |
