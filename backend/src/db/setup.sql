-- ============================================================
-- CipherSQLStudio PostgreSQL Setup
-- Run this script once to create all sandbox schemas and tables
-- ============================================================

-- Create schemas for each assignment type
CREATE SCHEMA IF NOT EXISTS assignment_users;
CREATE SCHEMA IF NOT EXISTS assignment_products;
CREATE SCHEMA IF NOT EXISTS assignment_employees;
CREATE SCHEMA IF NOT EXISTS assignment_customers;
CREATE SCHEMA IF NOT EXISTS assignment_orders;
CREATE SCHEMA IF NOT EXISTS assignment_sales;

-- ─── assignment_users schema ─────────────────────────────────
SET search_path TO assignment_users;

CREATE TABLE IF NOT EXISTS users (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT,
  age        INTEGER
);

INSERT INTO users (id, name, email, age) VALUES
  (1, 'Alice',   'alice@example.com',   28),
  (2, 'Bob',     'bob@example.com',     35),
  (3, 'Charlie', 'charlie@example.com', 22),
  (4, 'Diana',   'diana@example.com',   45),
  (5, 'Eve',     'eve@example.com',     31),
  (6, 'Frank',   'frank@example.com',   27),
  (7, 'Grace',   'grace@example.com',   38),
  (8, 'Henry',   'henry@example.com',   42),
  (9, 'Ivy',     'ivy@example.com',     29),
  (10,'Jack',    'jack@example.com',    55)
ON CONFLICT (id) DO NOTHING;

-- ─── assignment_products schema ─────────────────────────────
SET search_path TO assignment_products;

CREATE TABLE IF NOT EXISTS products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT,
  price    NUMERIC(10,2),
  stock    INTEGER DEFAULT 0
);

INSERT INTO products (id, name, category, price, stock) VALUES
  (1, 'Laptop',     'Electronics', 999.99, 15),
  (2, 'Mouse',      'Electronics',  29.99, 80),
  (3, 'Monitor',    'Electronics', 399.99, 20),
  (4, 'Keyboard',   'Electronics',  79.99, 45),
  (5, 'Webcam',     'Electronics', 149.99, 30),
  (6, 'USB Hub',    'Electronics',  19.99, 60),
  (7, 'Microphone', 'Audio',       199.99, 25),
  (8, 'Headphones', 'Audio',       249.99, 35),
  (9, 'Desk Chair', 'Furniture',   450.00, 10),
  (10,'Standing Desk','Furniture', 750.00,  5)
ON CONFLICT (id) DO NOTHING;

-- ─── assignment_employees schema ────────────────────────────
SET search_path TO assignment_employees;

CREATE TABLE IF NOT EXISTS employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  department TEXT,
  salary     NUMERIC(10,2),
  manager_id INTEGER,
  bonus      NUMERIC(10,2)
);

INSERT INTO employees (id, name, department, salary, manager_id, bonus) VALUES
  (1, 'Alice',   'Engineering', 8000.00, NULL,  1000.00),
  (2, 'Bob',     'Engineering', 9000.00, 1,     NULL),
  (3, 'Carol',   'Marketing',   4500.00, NULL,   500.00),
  (4, 'David',   'Marketing',   5000.00, 3,     NULL),
  (5, 'Eve',     'HR',          3800.00, NULL,  NULL),
  (6, 'Frank',   'Engineering', 7500.00, 1,     750.00),
  (7, 'Grace',   'Marketing',   4200.00, 3,     NULL),
  (8, 'Henry',   'HR',          4000.00, 5,     200.00),
  (9, 'Ivy',     'Engineering', 8500.00, 1,     900.00),
  (10,'Jack',    'Sales',       5500.00, NULL,  600.00)
ON CONFLICT (id) DO NOTHING;

-- ─── assignment_customers schema ────────────────────────────
SET search_path TO assignment_customers;

CREATE TABLE IF NOT EXISTS customers (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  email   TEXT,
  city    TEXT,
  country TEXT
);

INSERT INTO customers (id, name, email, city, country) VALUES
  (1, 'Alice Brown',   'alice@mail.com',  'New York', 'USA'),
  (2, 'Bob Smith',     'bob@mail.com',    'London',   'UK'),
  (3, 'Carol Jones',   'carol@mail.com',  'New York', 'USA'),
  (4, 'David Wilson',  'david@mail.com',  'Paris',    'France'),
  (5, 'Eve Davis',     'eve@mail.com',    'Tokyo',    'Japan'),
  (6, 'Frank Miller',  'frank@mail.com',  'London',   'UK'),
  (7, 'Grace Wang',    'grace@mail.com',  'Sydney',   'Australia'),
  (8, 'Henry Lee',     'henry@mail.com',  'Tokyo',    'Japan'),
  (9, 'Ivy Chen',      'ivy@mail.com',    'New York', 'USA'),
  (10,'Jack Martinez', 'jack@mail.com',   'Madrid',   'Spain')
ON CONFLICT (id) DO NOTHING;

-- ─── assignment_orders schema ────────────────────────────────
SET search_path TO assignment_orders;

CREATE TABLE IF NOT EXISTS customers (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  product_id  INTEGER REFERENCES products(id),
  quantity    INTEGER DEFAULT 1,
  amount      NUMERIC(10,2),
  status      TEXT DEFAULT 'pending',
  order_date  DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS order_items (
  id         INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  quantity   INTEGER
);

INSERT INTO customers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol'),(4,'David')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products VALUES
  (1,'Laptop',999.99),(2,'Mouse',29.99),(3,'Monitor',399.99),(4,'Keyboard',79.99)
ON CONFLICT (id) DO NOTHING;

INSERT INTO orders (id, customer_id, product_id, quantity, amount, status) VALUES
  (1, 1, 1, 1, 999.99, 'shipped'),
  (2, 2, 2, 3,  89.97, 'pending'),
  (3, 1, 3, 1, 399.99, 'delivered'),
  (4, 3, 1, 2,1999.98, 'shipped'),
  (5, 4, 4, 1,  79.99, 'pending'),
  (6, 3, 2, 2,  59.98, 'delivered')
ON CONFLICT (id) DO NOTHING;

INSERT INTO order_items (id, product_id, quantity) VALUES
  (1, 1, 2),(2, 2, 5),(3, 1, 1),(4, 3, 2)
ON CONFLICT (id) DO NOTHING;

-- ─── assignment_sales schema ─────────────────────────────────
SET search_path TO assignment_sales;

CREATE TABLE IF NOT EXISTS sales (
  id         INTEGER PRIMARY KEY,
  sale_date  DATE,
  category   TEXT,
  amount     NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS monthly_revenue (
  month   TEXT PRIMARY KEY,
  revenue NUMERIC(10,2)
);

INSERT INTO sales (id, sale_date, category, amount) VALUES
  (1, '2024-01-01', 'Electronics', 500.00),
  (2, '2024-01-02', 'Clothing',    200.00),
  (3, '2024-01-03', 'Electronics', 300.00),
  (4, '2024-01-04', 'Books',       100.00),
  (5, '2024-01-05', 'Clothing',    400.00),
  (6, '2024-01-06', 'Books',       150.00),
  (7, '2024-01-07', 'Electronics', 700.00),
  (8, '2024-01-08', 'Clothing',    350.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO monthly_revenue VALUES
  ('2024-01', 10000),
  ('2024-02', 12000),
  ('2024-03', 11000),
  ('2024-04', 14000),
  ('2024-05', 13500)
ON CONFLICT (month) DO NOTHING;

-- Grant READ-ONLY access to the database user
-- Replace 'your_pg_user' with the actual user you connect with
-- GRANT USAGE ON SCHEMA assignment_users TO your_pg_user;
-- GRANT SELECT ON ALL TABLES IN SCHEMA assignment_users TO your_pg_user;
-- (Repeat for all schemas)
