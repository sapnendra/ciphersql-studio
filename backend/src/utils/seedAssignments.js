require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');

const assignments = [
  // ─── EASY ───────────────────────────────────────────────────
  {
    title: 'Select All Users',
    description: 'Retrieve every record from the users table.',
    difficulty: 'Easy',
    question: 'Write a SQL query to retrieve all columns and rows from the users table.',
    schemaName: 'assignment_users',
    sampleTables: [
      {
        tableName: 'users',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'age', dataType: 'INTEGER' },
          { columnName: 'email', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Alice', 28, 'alice@example.com'],
          [2, 'Bob', 35, 'bob@example.com'],
          [3, 'Charlie', 22, 'charlie@example.com'],
        ],
      },
    ],
  },
  {
    title: 'Find Users Older Than 30',
    description: 'Filter users by age using a WHERE clause.',
    difficulty: 'Easy',
    question: 'Write a SQL query to find all users whose age is greater than 30.',
    schemaName: 'assignment_users',
    sampleTables: [
      {
        tableName: 'users',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'age', dataType: 'INTEGER' },
        ],
        rows: [
          [1, 'Alice', 28],
          [2, 'Bob', 35],
          [3, 'Diana', 41],
        ],
      },
    ],
  },
  {
    title: 'Count Total Products',
    description: 'Use COUNT() to get the number of products.',
    difficulty: 'Easy',
    question: 'Write a SQL query to count the total number of rows in the products table.',
    schemaName: 'assignment_products',
    sampleTables: [
      {
        tableName: 'products',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'price', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Widget', 9.99],
          [2, 'Gadget', 24.99],
          [3, 'Doohickey', 4.99],
        ],
      },
    ],
  },
  {
    title: 'Select Specific Columns',
    description: 'Practice selecting only the columns you need.',
    difficulty: 'Easy',
    question:
      'Write a SQL query to retrieve only the name and email columns from the users table.',
    schemaName: 'assignment_users',
    sampleTables: [
      {
        tableName: 'users',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'email', dataType: 'TEXT' },
          { columnName: 'age', dataType: 'INTEGER' },
        ],
        rows: [
          [1, 'Alice', 'alice@example.com', 28],
          [2, 'Bob', 'bob@example.com', 35],
        ],
      },
    ],
  },
  {
    title: 'Sort Products by Price',
    description: 'Use ORDER BY to sort results.',
    difficulty: 'Easy',
    question:
      'Write a SQL query to retrieve all products ordered by price in ascending order.',
    schemaName: 'assignment_products',
    sampleTables: [
      {
        tableName: 'products',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'price', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Widget', 9.99],
          [2, 'Gadget', 24.99],
          [3, 'Doohickey', 4.99],
        ],
      },
    ],
  },
  {
    title: 'Find Employees in Sales',
    description: 'Filter rows based on a text column.',
    difficulty: 'Easy',
    question:
      "Write a SQL query to retrieve all employees who belong to the 'Sales' department.",
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'department', dataType: 'TEXT' },
          { columnName: 'salary', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Alice', 'Sales', 55000],
          [2, 'Bob', 'Engineering', 85000],
          [3, 'Carol', 'Sales', 60000],
        ],
      },
    ],
  },
  {
    title: 'Limit Query Results',
    description: 'Use LIMIT to restrict the number of rows returned.',
    difficulty: 'Easy',
    question: 'Write a SQL query to retrieve only the first 5 rows from the orders table.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'customer_id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
          { columnName: 'created_at', dataType: 'TIMESTAMP' },
        ],
        rows: [
          [1, 101, 250.0, '2024-01-01'],
          [2, 102, 89.5, '2024-01-02'],
          [3, 101, 430.0, '2024-01-03'],
          [4, 103, 15.0, '2024-01-04'],
          [5, 104, 320.0, '2024-01-05'],
          [6, 105, 99.0, '2024-01-06'],
        ],
      },
    ],
  },
  {
    title: 'Find NULL Values',
    description: 'Use IS NULL to find records with missing data.',
    difficulty: 'Easy',
    question:
      'Write a SQL query to find all employees whose phone_number is NULL.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'phone_number', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Alice', '555-1234'],
          [2, 'Bob', null],
          [3, 'Carol', '555-5678'],
          [4, 'Dave', null],
        ],
      },
    ],
  },
  {
    title: 'Distinct Cities',
    description: 'Use DISTINCT to remove duplicate values.',
    difficulty: 'Easy',
    question:
      'Write a SQL query to retrieve distinct city values from the customers table.',
    schemaName: 'assignment_customers',
    sampleTables: [
      {
        tableName: 'customers',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'city', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Alice', 'New York'],
          [2, 'Bob', 'London'],
          [3, 'Carol', 'New York'],
          [4, 'Dave', 'Paris'],
        ],
      },
    ],
  },
  {
    title: 'Search with LIKE',
    description: 'Use LIKE for pattern matching in text columns.',
    difficulty: 'Easy',
    question:
      "Write a SQL query to find all products whose name starts with 'S'.",
    schemaName: 'assignment_products',
    sampleTables: [
      {
        tableName: 'products',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'price', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Screw', 0.99],
          [2, 'Hammer', 9.99],
          [3, 'Saw', 14.99],
          [4, 'Nail', 0.49],
        ],
      },
    ],
  },
  // ─── MEDIUM ───────────────────────────────────────────────────
  {
    title: 'Average Salary by Department',
    description: 'Use GROUP BY with AVG() to aggregate data.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to calculate the average salary for each department in the employees table.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'department', dataType: 'TEXT' },
          { columnName: 'salary', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Alice', 'Sales', 55000],
          [2, 'Bob', 'Engineering', 85000],
          [3, 'Carol', 'Sales', 62000],
          [4, 'Dave', 'Engineering', 90000],
        ],
      },
    ],
  },
  {
    title: 'Join Orders and Customers',
    description: 'Use INNER JOIN to combine data from two tables.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to retrieve order IDs along with the customer name for each order.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'customer_id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 101, 250.0],
          [2, 102, 89.5],
        ],
      },
      {
        tableName: 'customers',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
        ],
        rows: [
          [101, 'Alice'],
          [102, 'Bob'],
        ],
      },
    ],
  },
  {
    title: 'Top 5 Expensive Products',
    description: 'Combine ORDER BY and LIMIT to find top records.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to retrieve the top 5 most expensive products sorted by price descending.',
    schemaName: 'assignment_products',
    sampleTables: [
      {
        tableName: 'products',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'price', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Widget', 9.99],
          [2, 'Gadget', 24.99],
          [3, 'Luxury Item', 499.99],
          [4, 'Basic Item', 1.99],
          [5, 'Premium', 199.99],
          [6, 'Economy', 3.49],
        ],
      },
    ],
  },
  {
    title: 'Total Revenue per Customer',
    description: 'Use GROUP BY and SUM() on joined tables.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to calculate the total order value per customer using the orders table.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'customer_id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 101, 250.0],
          [2, 101, 180.5],
          [3, 102, 89.5],
          [4, 102, 430.0],
        ],
      },
    ],
  },
  {
    title: 'Departments with More Than 2 Employees',
    description: 'Use HAVING to filter aggregated results.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to find departments that have more than 2 employees.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'department', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Alice', 'Sales'],
          [2, 'Bob', 'Engineering'],
          [3, 'Carol', 'Sales'],
          [4, 'Dave', 'Engineering'],
          [5, 'Eve', 'Sales'],
        ],
      },
    ],
  },
  {
    title: 'Find Customers without Orders',
    description: 'Use LEFT JOIN and IS NULL to find unmatched records.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to find all customers who have never placed an order.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'customers',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
        ],
        rows: [
          [101, 'Alice'],
          [102, 'Bob'],
          [103, 'Carol'],
        ],
      },
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'customer_id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 101, 250.0],
          [2, 101, 180.5],
        ],
      },
    ],
  },
  {
    title: 'Product Price Range Filter',
    description: 'Use BETWEEN to filter rows within a numeric range.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to find all products priced between $10 and $100.',
    schemaName: 'assignment_products',
    sampleTables: [
      {
        tableName: 'products',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'price', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Widget', 9.99],
          [2, 'Gadget', 24.99],
          [3, 'Luxury Item', 499.99],
          [4, 'Basic Item', 1.99],
          [5, 'Mid Range', 55.0],
        ],
      },
    ],
  },
  {
    title: 'Max Salary Finder',
    description: 'Use MAX() to find the highest value.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to find the employee with the highest salary in the employees table.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'salary', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Alice', 55000],
          [2, 'Bob', 85000],
          [3, 'Carol', 92000],
        ],
      },
    ],
  },
  {
    title: 'Recent Orders',
    description: 'Filter date columns and sort results by date.',
    difficulty: 'Medium',
    question:
      "Write a SQL query to retrieve all orders placed after '2024-06-01', sorted by date descending.",
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'customer_id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
          { columnName: 'created_at', dataType: 'DATE' },
        ],
        rows: [
          [1, 101, 250.0, '2024-05-15'],
          [2, 102, 89.5, '2024-06-10'],
          [3, 103, 430.0, '2024-07-01'],
        ],
      },
    ],
  },
  {
    title: 'Employee Self-Join',
    description: 'Use a self-join to find managers and their reports.',
    difficulty: 'Medium',
    question:
      'Write a SQL query to list each employee alongside the name of their manager.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'manager_id', dataType: 'INTEGER' },
        ],
        rows: [
          [1, 'Alice', null],
          [2, 'Bob', 1],
          [3, 'Carol', 1],
          [4, 'Dave', 2],
        ],
      },
    ],
  },
  // ─── HARD ───────────────────────────────────────────────────
  {
    title: 'Rank Employees by Salary',
    description: 'Use window functions to rank employees.',
    difficulty: 'Hard',
    question:
      'Write a SQL query using RANK() window function to rank employees by salary within each department.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'department', dataType: 'TEXT' },
          { columnName: 'salary', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Alice', 'Sales', 55000],
          [2, 'Bob', 'Engineering', 85000],
          [3, 'Carol', 'Sales', 62000],
          [4, 'Dave', 'Engineering', 90000],
        ],
      },
    ],
  },
  {
    title: 'Running Total of Orders',
    description: 'Use SUM with a window frame to compute running totals.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to compute a running total of the order amount, ordered by order date.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
          { columnName: 'created_at', dataType: 'DATE' },
        ],
        rows: [
          [1, 100.0, '2024-01-01'],
          [2, 200.0, '2024-01-02'],
          [3, 150.0, '2024-01-03'],
        ],
      },
    ],
  },
  {
    title: 'Find Duplicate Emails',
    description: 'Use GROUP BY and HAVING to detect duplicate values.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to find all email addresses that appear more than once in the users table.',
    schemaName: 'assignment_users',
    sampleTables: [
      {
        tableName: 'users',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'email', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Alice', 'alice@example.com'],
          [2, 'Bob', 'bob@example.com'],
          [3, 'Alice2', 'alice@example.com'],
          [4, 'Carol', 'carol@example.com'],
        ],
      },
    ],
  },
  {
    title: 'Top Customer per Region',
    description: 'Use a subquery or CTE to find top spenders per region.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to find the customer who spent the most in each region.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'customers',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'region', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Alice', 'North'],
          [2, 'Bob', 'North'],
          [3, 'Carol', 'South'],
        ],
      },
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'customer_id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 1, 500.0],
          [2, 2, 300.0],
          [3, 3, 900.0],
          [4, 1, 200.0],
        ],
      },
    ],
  },
  {
    title: 'Products Never Ordered',
    description: 'Use NOT EXISTS or LEFT JOIN to find unordered products.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to find all products that have never appeared in any order.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'products',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Widget'],
          [2, 'Gadget'],
          [3, 'Doohickey'],
        ],
      },
      {
        tableName: 'order_items',
        columns: [
          { columnName: 'order_id', dataType: 'INTEGER' },
          { columnName: 'product_id', dataType: 'INTEGER' },
          { columnName: 'quantity', dataType: 'INTEGER' },
        ],
        rows: [
          [1, 1, 2],
          [2, 2, 1],
        ],
      },
    ],
  },
  {
    title: 'N-th Highest Salary',
    description: 'Use subqueries or OFFSET to find the Nth highest salary.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to find the 3rd highest salary in the employees table.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'salary', dataType: 'NUMERIC' },
        ],
        rows: [
          [1, 'Alice', 55000],
          [2, 'Bob', 85000],
          [3, 'Carol', 92000],
          [4, 'Dave', 70000],
          [5, 'Eve', 110000],
        ],
      },
    ],
  },
  {
    title: 'Monthly Order Totals',
    description: 'Use date functions to aggregate data by month.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to calculate the total revenue for each month in the orders table.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'total', dataType: 'NUMERIC' },
          { columnName: 'created_at', dataType: 'DATE' },
        ],
        rows: [
          [1, 100.0, '2024-01-15'],
          [2, 200.0, '2024-01-22'],
          [3, 350.0, '2024-02-05'],
          [4, 150.0, '2024-02-18'],
        ],
      },
    ],
  },
  {
    title: 'Pivot Department Headcount',
    description: 'Use CASE + SUM to create a simple pivot table.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to show the count of employees in Sales, Engineering, and HR as separate columns.',
    schemaName: 'assignment_employees',
    sampleTables: [
      {
        tableName: 'employees',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'department', dataType: 'TEXT' },
        ],
        rows: [
          [1, 'Alice', 'Sales'],
          [2, 'Bob', 'Engineering'],
          [3, 'Carol', 'Sales'],
          [4, 'Dave', 'HR'],
          [5, 'Eve', 'Engineering'],
        ],
      },
    ],
  },
  {
    title: 'Recursive Category Tree',
    description: 'Use a recursive CTE to traverse a hierarchy.',
    difficulty: 'Hard',
    question:
      'Write a recursive SQL query to retrieve the full category hierarchy from the categories table, starting from the root nodes.',
    schemaName: 'assignment_products',
    sampleTables: [
      {
        tableName: 'categories',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'name', dataType: 'TEXT' },
          { columnName: 'parent_id', dataType: 'INTEGER' },
        ],
        rows: [
          [1, 'Electronics', null],
          [2, 'Smartphones', 1],
          [3, 'Laptops', 1],
          [4, 'Android', 2],
          [5, 'iOS', 2],
        ],
      },
    ],
  },
  {
    title: 'Customers with Consecutive Orders',
    description: 'Use window functions to detect patterns in time-series data.',
    difficulty: 'Hard',
    question:
      'Write a SQL query to find customers who placed orders on at least 3 consecutive days.',
    schemaName: 'assignment_orders',
    sampleTables: [
      {
        tableName: 'orders',
        columns: [
          { columnName: 'id', dataType: 'INTEGER' },
          { columnName: 'customer_id', dataType: 'INTEGER' },
          { columnName: 'created_at', dataType: 'DATE' },
        ],
        rows: [
          [1, 101, '2024-03-01'],
          [2, 101, '2024-03-02'],
          [3, 101, '2024-03-03'],
          [4, 102, '2024-03-01'],
          [5, 102, '2024-03-05'],
        ],
      },
    ],
  },
];

const seedAssignments = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Assignment.deleteMany({});
    console.log('Existing assignments cleared');

    const inserted = await Assignment.insertMany(assignments);
    console.log(`${inserted.length} assignments seeded successfully`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seedAssignments();
