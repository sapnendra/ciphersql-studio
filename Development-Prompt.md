# CipherSQLStudio - Development Instructions

## Project Overview

You are an expert senior full-stack engineer. Your task is to build **CipherSQLStudio**, a browser-based SQL learning sandbox where students can practice SQL queries against pre-configured assignments.

The system allows users to:

- Browse SQL assignments
- View sample database tables
- Write and execute SQL queries
- See results instantly
- Request AI-generated hints (NOT solutions)

This is **NOT a database creation platform**. All assignments and sample datasets are **pre-inserted by administrators**.

Focus on creating a **clean, developer-friendly, production-quality architecture**.

---

# Tech Stack

## Frontend

- React.js
- Monaco Editor
- Vanilla SCSS (Use SCSS features: variables, mixins, nesting, and partials
  )
- Mobile-first responsive design

    #### Required Approach
    - Build mobile-first responsive layouts (320px, 641px, 1024px, 1281px)
    - Use SCSS features: variables, mixins, nesting, and partials
    - Follow BEM or similar CSS naming conventions
    - Ensure touch-friendly UI elements for mobile devices


## Backend

- Node.js
- Express.js

## Databases

- PostgreSQL → Query execution sandbox
- MongoDB Atlas → Assignments + user progress

## AI Integration

- OpenAI / Gemini API
- Used only for **hint generation**

---

# Design System

## Typography

Use the following fonts:

Headings
Space Grotesk

Body Text
Inter

Example:

```
font-family: 'Space Grotesk', sans-serif;
font-family: 'Inter', sans-serif;
```

---

# Developer Friendly Color Palette

Use a modern developer UI palette similar to VSCode / Linear.

Primary Colors

```
Primary: #6366F1
Primary Dark: #4F46E5
Primary Light: #A5B4FC
```

Background

```
Background: #0F172A
Surface: #1E293B
Card: #111827
```

Text

```
Heading: #F9FAFB
Body: #D1D5DB
Muted: #9CA3AF
```

Status Colors

```
Success: #22C55E
Error: #EF4444
Warning: #F59E0B
Info: #3B82F6
```

Borders

```
Border: #374151
```

---

# UI Principles

- Mobile First
- Touch Friendly
- Clean developer style
- Dark mode default
- Clear visual hierarchy
- SQL editor should dominate the screen

Breakpoints

```
320px
641px
1024px
1281px
```

---

# Application Pages

## 1. Authentication Pages

### Login Page

Fields

- Email
- Password

Buttons

- Login
- Go to Signup

API

```
POST /api/auth/login
```

---

### Signup Page

Fields

- Name
- Email
- Password

API

```
POST /api/auth/signup
```

Store user in MongoDB.

Password hashing using bcrypt.

Use JWT authentication.

---

# 2. Assignment Listing Page (Seed atleast 30 assignments in MongoDB and display them in a paginated list)

Route

```
/assignments
```

Display list of assignments.

Each card shows:

```
Title
Difficulty
Short Description
Attempt Button
```

Example card layout:

```
--------------------------------
Find Users Older Than 30
Difficulty: Easy
Description: Filter users by age
[Attempt]
--------------------------------
```

API

```
GET /api/assignments
```

Data source: MongoDB.

---

# 3. Assignment Workspace Page

Route

```
/assignments/:id
```

Page layout:

```
-------------------------------------------------------
Question Panel
-------------------------------------------------------

Sample Data Viewer

-------------------------------------------------------
SQL Editor (Monaco)

-------------------------------------------------------
Run Query | Get Hint

-------------------------------------------------------
Results Table
-------------------------------------------------------
```

---

# Components Structure

```
components/

AssignmentCard
SQLWorkspace
QuestionPanel
SampleDataViewer
SQLEditor
QueryResults
HintBox
Navbar
AuthForm
```

---

# SQL Editor

Use **Monaco Editor**.

Features:

- SQL syntax highlighting
- Default query template
- Keyboard shortcut for execution (Ctrl + Enter)

Example default query

```
SELECT * FROM users;
```

---

# Query Execution Flow

User clicks **Run Query**

Frontend

```
POST /api/query/execute
```

Request

```
{
  assignmentId: "123",
  query: "SELECT * FROM users"
}
```

Backend flow

1. Validate SQL
2. Prevent destructive queries
3. Connect PostgreSQL
4. Execute query
5. Return results

Response

```
{
 success: true,
 rows: []
}
```

---

# Security Rules

Disallow:

```
DROP
ALTER
DELETE
TRUNCATE
CREATE
```

Allow only:

```
SELECT
```

Sanitize queries before execution.

---

# PostgreSQL Sandbox

Each user receives an isolated schema.

Example:

```
workspace_user123
workspace_user456
```

Example SQL

```
SET search_path TO workspace_user123;
SELECT * FROM users;
```

This ensures users cannot modify global data.

---

# Sample Data Viewer

Display:

```
Table Name
Columns
Sample Rows
```

Example

Table: users

Columns

```
id INTEGER
name TEXT
age INTEGER
```

Rows

```
1 | John | 25
2 | Sam | 35
```

---

# Results Panel

Display results in table.

Example

```
id | name | age
2  | Sam  | 35
```

Show errors clearly.

Example

```
SQL Error: column age does not exist
```

---

# AI Hint System

User clicks **Get Hint**

API

```
POST /api/hint
```

Request

```
{
 question: "...",
 userQuery: "...",
 schema: "..."
}
```

Prompt Template

```
You are a SQL teaching assistant.

Provide a helpful hint to guide the student.

DO NOT provide the full solution.

Explain concepts instead.

Question:
{{question}}

User Query:
{{query}}

Schema:
{{tables}}
```

Example Response

```
Hint:
Consider filtering rows using a WHERE condition on the age column.
```

---

# MongoDB Schemas

## Assignment Schema

```
{
 title: String,
 description: String,
 difficulty: String,
 question: String,

 sampleTables: [
   {
     tableName: String,
     columns: [
       {
         columnName: String,
         dataType: String
       }
     ],
     rows: []
   }
 ],

 expectedOutput: {
   type: String,
   value: Mixed
 }
}
```

---

## User Schema

```
{
 name: String,
 email: String,
 password: String,
 createdAt: Date
}
```

---

## UserProgress

```
{
 userId: ObjectId,
 assignmentId: ObjectId,
 sqlQuery: String,
 lastAttempt: Date,
 isCompleted: Boolean,
 attemptCount: Number
}
```

---

# Backend Folder Structure

```
backend

src
 controllers
 routes
 middleware
 services
 db
 models
 utils
 config

server.js
```

---

# Frontend Folder Structure

```
frontend

src
 components
 pages
 hooks
 services
 styles
 context
 utils
```

---

# SCSS Structure

```
styles/

variables.scss
mixins.scss
base.scss
layout.scss

components/
buttons.scss
cards.scss
editor.scss
tables.scss
```

Use

```
variables
nesting
mixins
partials
```

Follow **BEM naming convention**.

Example

```
.assignment-card
.assignment-card__title
.assignment-card__difficulty
```

---

# Data Flow Diagram (Must Be Hand Drawn)

Example flow

```
User clicks Execute Query
        ↓
React sends POST request
        ↓
/api/query/execute
        ↓
Backend validates query
        ↓
PostgreSQL executes query
        ↓
Result returned
        ↓
Backend response
        ↓
React state update
        ↓
Results table rendered
```

---

# Required API Endpoints

Authentication

```
POST /api/auth/signup
POST /api/auth/login
```

Assignments

```
GET /api/assignments
GET /api/assignments/:id
```

Query Execution

```
POST /api/query/execute
```

Hints

```
POST /api/hint
```

User Progress

```
POST /api/progress
GET /api/progress/:assignmentId
```

---

# README Requirements

Include

- Setup Instructions
- Environment Variables
- Architecture Explanation
- Data Flow Diagram
- Tech Stack Justification

---

# Environment Variables

Backend

```
PORT=
MONGO_URI=
POSTGRES_URI=
JWT_SECRET=
OPENAI_API_KEY=
```

Frontend

```
VITE_API_URL=
```

---

# Expected User Flow

```
User signs up
        ↓
Login
        ↓
View SQL assignments
        ↓
Open assignment
        ↓
Read question
        ↓
View sample tables
        ↓
Write SQL query
        ↓
Execute query
        ↓
See results
        ↓
Request hint if stuck
```

---

# Goal

Produce a **clean, modular, scalable full-stack application** that demonstrates:

- Strong frontend architecture
- Secure SQL execution
- Proper API design
- Prompt engineering for AI hints
- Mobile-first responsive UI
- Clean SCSS styling
- Developer-friendly UX
