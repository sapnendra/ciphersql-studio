# CipherSQLStudio — Complete UI Redesign Prompt

You are a **senior product designer + senior frontend engineer**.

Your task is to **completely redesign the UI/UX of the existing CipherSQLStudio project**.
The current UI looks **generic and AI-generated**, lacks visual hierarchy, and does not create an engaging developer experience.

Transform the application into a **premium developer tool interface** inspired by:

* Linear
* Vercel
* Supabase
* Raycast
* modern developer dashboards

The UI should feel like **a real product used by developers daily**, not a template.

---

# Core Design Goals

1. The landing page must **instantly capture attention**
2. The UI must feel **premium and developer-focused**
3. Avoid **generic hero sections**
4. Use **modern dark developer theme**
5. Create **depth, glow, grid, and lighting**
6. Make the SQL editor feel like the **core of the product**
7. Add **smooth animations and micro interactions**

---

# Typography

Use these fonts consistently.

Headings

```
Space Grotesk
```

Body

```
Inter
```

Font hierarchy

Hero Title

```
56px
font-weight: 700
```

Section Titles

```
32px
```

Body Text

```
16px
```

---

# New Color System (Developer UI Palette)

Create a visually rich dark theme.

Background Layers

```
Primary Background: #0B0F1A
Secondary Background: #0F172A
Surface: #111827
Card Background: #0B1220
```

Primary Accent

```
Gradient Primary:
#7C3AED → #A855F7
```

Secondary Accent

```
#22C55E
```

Glow Colors

```
Purple Glow: rgba(124,58,237,0.35)
Green Glow: rgba(34,197,94,0.35)
```

Text Colors

```
Heading: #F8FAFC
Body: #CBD5F5
Muted: #64748B
```

Borders

```
rgba(255,255,255,0.06)
```

---

# Background Design

The landing page must **not look flat**.

Add a **developer grid background** like the reference image.

Implementation idea:

```
radial gradient glow
grid pattern overlay
animated noise texture
```

Example

```
background:
radial-gradient(circle at 20% 20%, rgba(124,58,237,0.2), transparent 40%),
radial-gradient(circle at 80% 60%, rgba(34,197,94,0.15), transparent 40%),
#0B0F1A;
```

Add a subtle **grid pattern**

---

# Hero Section Redesign

Current hero section is boring.

Replace it with a **two-column layout**.

Left side:

```
Small badge
Large hero title
Short description
Primary CTA
Secondary CTA
```

Example

Badge

```
SQL Learning Sandbox
```

Hero Title

```
Master SQL Through
Real Interactive
Practice
```

Highlight keywords with gradient text.

Example

```
Real Interactive
```

should have gradient.

Buttons

```
Browse Assignments
Start Practicing
```

Buttons must have **glow hover effect**.

---

# Right Side Hero

Create a **fake SQL interface preview card**.

This should look like a **mini SQL playground**.

Include

```
Window header
SQL editor code
query results table
```

Example code preview

```
SELECT name, age
FROM users
WHERE age > 30;
```

Add glowing card border.

---

# Floating Developer Icons

Around the hero add floating icons.

Examples

```
database
terminal
code
query
```

Icons must slowly float with animation.

---

# Feature Section Redesign

Replace the current feature cards with **interactive cards**.

Each card should include

```
icon
title
description
hover animation
glow border
```

Features

```
Live SQL Execution
30+ SQL Assignments
AI Guided Hints
Isolated PostgreSQL Sandbox
```

Cards should animate slightly on hover.

---

# Add a Product Demo Section

Create a **product showcase section**.

Display

```
SQL Editor
Query results
Table viewer
```

This should look like a **real developer IDE**.

Add tabs

```
Query
Tables
Results
```

---

# Add an Assignment Preview Section

Show example assignment cards.

Example

```
Find users older than 30
Difficulty: Easy
Tables: users
```

Cards should look like **coding challenges**.

---

# Navigation Bar Redesign

Navbar should be **clean and minimal**.

Left

```
Logo
CipherSQLStudio
```

Center

```
Assignments
Docs
Resources
```

Right

```
Search
Login
Get Started Button
```

Navbar must be **semi-transparent with blur**.

Example

```
backdrop-filter: blur(10px)
```

---

# Application Loading Screen

Create a loading page that appears when the site loads.

Duration

```
2–3 seconds
```

Design

Dark background.

Centered animated logo.

Logo animation

```
rotating hexagon
or
terminal cursor blinking
```

Loading text

```
Initializing SQL Sandbox...
Preparing database environment...
Loading assignments...
```

Add animated progress bar.

After loading

```
fade into homepage
```

---

# SQL Workspace Page Redesign

The SQL workspace must look like a **real development environment**.

Layout

```
Left: Question Panel
Center: SQL Editor
Right: Table Schema
Bottom: Query Results
```

Panels should be resizable.

Add **VSCode-like styling**.

Editor theme

```
dark
syntax highlighting
line numbers
```

---

# Button Design

Primary button

```
Gradient background
Glow effect
```

Hover effect

```
scale 1.03
shadow glow
```

Secondary button

```
outline style
```

---

# Micro Interactions

Add subtle animations.

Examples

```
card hover lift
button glow
page fade transitions
editor cursor blink
```

---

# Responsive Design

Mobile first.

Breakpoints

```
320px
640px
1024px
1280px
```

On mobile

```
stack hero vertically
collapse navigation
```

---

# SCSS Architecture

Use SCSS features.

Required

```
variables
mixins
nesting
partials
```

Structure

```
styles/

variables.scss
mixins.scss
animations.scss
globals.scss

components/
navbar.scss
hero.scss
cards.scss
editor.scss
loading.scss
```

Use BEM naming.

Example

```
.hero
.hero__title
.hero__cta
.hero__preview
```

---

# Animation Library

Use

```
Framer Motion
```

or

```
CSS keyframes
```

Animations

```
fade in
slide up
floating icons
card hover
loading animation
```

---

# Performance Requirements

Ensure

```
smooth animations
lazy loading
optimized assets
```

---

# Final Expected Result

The redesigned UI must:

* Look like a **modern developer SaaS product**
* Have **depth and glow**
* Feel **interactive and polished**
* Avoid any **generic template appearance**
* Match the quality of **Linear / Vercel / Supabase dashboards**

The homepage should make users feel:

```
"I want to explore this product"
```

Not

```
"This looks like a random AI generated site"
```

Replace existing UI components completely where necessary.
