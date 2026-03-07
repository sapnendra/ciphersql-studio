import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  BookOpen,
  Lightbulb,
  ShieldCheck,
  Database,
  Terminal,
  Code2,
  Layers,
  Play,
  ChevronRight,
} from "lucide-react";
import useMeta from "../hooks/useMeta";
import { useAuth } from "../context/AuthContext";
import "./HomePage.scss";

// ── Static data ──────────────────────────────────────────────────
const FEATURES = [
  {
    Icon: Zap,
    title: "Live SQL Execution",
    color: "purple",
    desc: "Run queries instantly against real sandboxed PostgreSQL databases. See results in milliseconds.",
  },
  {
    Icon: BookOpen,
    title: "30+ Assignments",
    color: "green",
    desc: "Curated exercises from beginner SELECT to advanced multi-table JOINs and aggregations.",
  },
  {
    Icon: Lightbulb,
    title: "AI-Powered Hints",
    color: "purple",
    desc: "Get contextual hints tailored to your query — without being handed the final answer.",
  },
  {
    Icon: ShieldCheck,
    title: "Safe Sandbox",
    color: "green",
    desc: "Isolated per-assignment schemas let you experiment freely without breaking anything.",
  },
];

const DEMO_TABS = [
  {
    label: "SELECT",
    query: `SELECT\n  p.name,\n  p.price,\n  c.name AS category\nFROM products p\nJOIN categories c\n  ON p.category_id = c.id\nWHERE p.price > 100\nORDER BY p.price DESC\nLIMIT 5;`,
    rows: [
      { name: "Pro Keyboard", price: "$249", category: "Electronics" },
      { name: "Desk Lamp", price: "$189", category: "Office" },
      { name: "USB-C Hub", price: "$129", category: "Electronics" },
    ],
  },
  {
    label: "JOIN",
    query: `SELECT\n  u.name,\n  COUNT(o.id) AS orders,\n  SUM(o.total) AS revenue\nFROM users u\nLEFT JOIN orders o\n  ON u.id = o.user_id\nGROUP BY u.id\nHAVING SUM(o.total) > 500;`,
    rows: [
      { name: "Alice", orders: "12", revenue: "$1,450" },
      { name: "Bob", orders: "8", revenue: "$920" },
      { name: "Charlie", orders: "5", revenue: "$640" },
    ],
  },
  {
    label: "AGGREGATE",
    query: `SELECT\n  DATE_TRUNC('month', created_at) AS month,\n  COUNT(*) AS total_sales,\n  AVG(amount) AS avg\nFROM sales\nWHERE created_at >= '2024-01-01'\nGROUP BY 1\nORDER BY 1;`,
    rows: [
      { month: "Jan 2024", total_sales: "234", avg: "$78.40" },
      { month: "Feb 2024", total_sales: "198", avg: "$82.10" },
      { month: "Mar 2024", total_sales: "312", avg: "$75.90" },
    ],
  },
];

const SAMPLE_ASSIGNMENTS = [
  {
    id: 1,
    title: "Basic SELECT Queries",
    difficulty: "Beginner",
    tag: "SELECT",
  },
  {
    id: 2,
    title: "Filtering with WHERE",
    difficulty: "Beginner",
    tag: "WHERE",
  },
  {
    id: 3,
    title: "Aggregating Data",
    difficulty: "Intermediate",
    tag: "GROUP BY",
  },
  {
    id: 4,
    title: "Multi-Table JOINs",
    difficulty: "Intermediate",
    tag: "JOIN",
  },
  { id: 5, title: "Subqueries and CTEs", difficulty: "Advanced", tag: "CTE" },
  { id: 6, title: "Window Functions", difficulty: "Advanced", tag: "WINDOW" },
];

const SQL_KEYWORDS_RE =
  /\b(SELECT|FROM|WHERE|JOIN|LEFT|LEFT JOIN|ON|GROUP BY|ORDER BY|HAVING|LIMIT|COUNT|SUM|AVG|AS|AND|OR|DESC|ASC|DATE_TRUNC|BY|GROUP|ORDER)\b/gi;

const highlightSQL = (text) =>
  text.split("\n").map((line, li, arr) => {
    const parts = line.split(
      /(\'[^\']*\'|\b(?:SELECT|FROM|WHERE|JOIN|LEFT|ON|GROUP|ORDER|HAVING|LIMIT|COUNT|SUM|AVG|AS|AND|OR|DESC|ASC|DATE_TRUNC|BY)\b|\d+)/gi,
    );
    return (
      <span key={li}>
        {parts.map((seg, i) => {
          if (/^'/.test(seg))
            return (
              <span key={i} className="sq-str">
                {seg}
              </span>
            );
          if (/^\d+$/.test(seg))
            return (
              <span key={i} className="sq-num">
                {seg}
              </span>
            );
          if (
            /^(SELECT|FROM|WHERE|JOIN|LEFT|ON|GROUP|ORDER|HAVING|LIMIT|COUNT|SUM|AVG|AS|AND|OR|DESC|ASC|DATE_TRUNC|BY)$/i.test(
              seg,
            )
          )
            return (
              <span key={i} className="sq-kw">
                {seg}
              </span>
            );
          return <span key={i}>{seg}</span>;
        })}
        {li < arr.length - 1 && "\n"}
      </span>
    );
  });

// ── Component ─────────────────────────────────────────────────────
const HomePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const tab = DEMO_TABS[activeTab];

  useMeta({
    title: "Interactive SQL Learning Sandbox",
    description:
      "Master SQL by writing real queries. 30+ hands-on assignments backed by a live PostgreSQL sandbox. " +
      "Get AI hints, track progress, and build real database skills - no setup required.",
  });

  return (
    <main className="hp">
      {/* ══ HERO ══ */}
      <section className="hp__hero">
        <div className="hp__hero-bg" aria-hidden="true">
          <div className="hp__hero-glow hp__hero-glow--purple" />
          <div className="hp__hero-glow hp__hero-glow--green" />
        </div>

        <div className="hp__hero-inner">
          <div className="hp__hero-left">
            <div className="hp__badge">
              <Zap size={12} />
              <span>Fully Interactive SQL Sandbox</span>
            </div>

            <h1 className="hp__hero-title">
              Learn SQL by{" "}
              <span className="hp__gradient-text">
                {" "}
                <br />
                Writing Real
              </span>{" "}
              <span className="hp__gradient-text">Queries</span>
            </h1>

            <p className="hp__hero-desc">
              30+ hands-on assignments backed by a live PostgreSQL sandbox. Run
              queries, get AI hints, and track your progress - no setup
              required.
            </p>

            <div className="hp__hero-actions">
              {user ? (
                <Link to="/assignments" className="btn btn--primary btn--lg">
                  <Play size={16} />
                  Continue Learning
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="btn btn--primary btn--lg hp__cta-glow"
                  >
                    <Play size={16} />
                    Start for Free
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/login" className="btn btn--ghost btn--lg">
                    Sign In
                  </Link>
                </>
              )}
            </div>

            <div className="hp__hero-stats">
              <div className="hp__stat">
                <span className="hp__stat-num">30+</span>
                <span className="hp__stat-label">Assignments</span>
              </div>
              <div className="hp__stat-divider" />
              <div className="hp__stat">
                <span className="hp__stat-num">6</span>
                <span className="hp__stat-label">Datasets</span>
              </div>
              <div className="hp__stat-divider" />
              <div className="hp__stat">
                <span className="hp__stat-num">AI</span>
                <span className="hp__stat-label">Hints</span>
              </div>
            </div>
          </div>

          <div className="hp__hero-right">
            <div className="hp__sql-card">
              <div className="hp__sql-chrome">
                <span className="hp__sql-dot hp__sql-dot--red" />
                <span className="hp__sql-dot hp__sql-dot--yellow" />
                <span className="hp__sql-dot hp__sql-dot--green" />
                <span className="hp__sql-chrome-title">query.sql</span>
              </div>
              <pre className="hp__sql-code">
                <code>
                  {highlightSQL(
                    `SELECT\n  p.name,\n  p.price,\n  c.name AS category\nFROM products p\nJOIN categories c\n  ON p.category_id = c.id\nWHERE p.price > 100\nORDER BY p.price DESC\nLIMIT 5;`,
                  )}
                </code>
              </pre>
              <div className="hp__sql-run">
                <button className="hp__sql-run-btn">
                  <Play size={12} /> Run Query
                </button>
                <span className="hp__sql-run-status">3 rows · 12ms</span>
              </div>
              <div className="hp__sql-results">
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>price</th>
                      <th>category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Pro Keyboard</td>
                      <td className="hp__num">$249</td>
                      <td>Electronics</td>
                    </tr>
                    <tr>
                      <td>Desk Lamp</td>
                      <td className="hp__num">$189</td>
                      <td>Office</td>
                    </tr>
                    <tr>
                      <td>USB-C Hub</td>
                      <td className="hp__num">$129</td>
                      <td>Electronics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="hp__float hp__float--db">
              <Database size={18} />
            </div>
            <div className="hp__float hp__float--term">
              <Terminal size={18} />
            </div>
            <div className="hp__float hp__float--code">
              <Code2 size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="hp__features">
        <div className="hp__section-inner">
          <div className="hp__section-header">
            <div className="hp__badge">
              <Layers size={12} />
              <span>Features</span>
            </div>
            <h2 className="hp__section-title">
              Everything you need to master SQL
            </h2>
            <p className="hp__section-sub">
              A complete learning environment built for developers who learn by
              doing.
            </p>
          </div>
          <div className="hp__feature-grid">
            {FEATURES.map(({ Icon, title, desc, color }) => (
              <div
                key={title}
                className={`hp__feature-card hp__feature-card--${color}`}
              >
                <div className="hp__feature-icon">
                  <Icon size={22} />
                </div>
                <h3 className="hp__feature-title">{title}</h3>
                <p className="hp__feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEMO ══ */}
      <section className="hp__demo">
        <div className="hp__section-inner">
          <div className="hp__section-header">
            <div className="hp__badge hp__badge--green">
              <Terminal size={12} />
              <span>Interactive Demo</span>
            </div>
            <h2 className="hp__section-title">Real SQL. Real Results.</h2>
            <p className="hp__section-sub">
              Explore the kinds of queries you'll master in assignments.
            </p>
          </div>
          <div className="hp__demo-panel">
            <div className="hp__demo-tabs">
              {DEMO_TABS.map((t, i) => (
                <button
                  key={t.label}
                  className={`hp__demo-tab${i === activeTab ? " hp__demo-tab--active" : ""}`}
                  onClick={() => setActiveTab(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="hp__demo-body">
              <div className="hp__demo-editor">
                <div className="hp__sql-chrome hp__sql-chrome--sm">
                  <span className="hp__sql-dot hp__sql-dot--red" />
                  <span className="hp__sql-dot hp__sql-dot--yellow" />
                  <span className="hp__sql-dot hp__sql-dot--green" />
                  <span className="hp__sql-chrome-title">playground.sql</span>
                </div>
                <pre className="hp__sql-code hp__sql-code--demo">
                  <code>{highlightSQL(tab.query)}</code>
                </pre>
                <div className="hp__sql-run">
                  <button className="hp__sql-run-btn">
                    <Play size={12} /> Run Query
                  </button>
                  <span className="hp__sql-run-status">
                    {tab.rows.length} rows returned
                  </span>
                </div>
              </div>
              <div className="hp__demo-results">
                <table className="hp__results-table">
                  <thead>
                    <tr>
                      {Object.keys(tab.rows[0]).map((k) => (
                        <th key={k}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tab.rows.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((v, j) => (
                          <td key={j}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ASSIGNMENT PREVIEW ══ */}
      <section className="hp__assignments">
        <div className="hp__section-inner">
          <div className="hp__section-header">
            <div className="hp__badge">
              <BookOpen size={12} />
              <span>Curriculum</span>
            </div>
            <h2 className="hp__section-title">
              From SELECT to Window Functions
            </h2>
            <p className="hp__section-sub">
              30+ assignments across 3 difficulty levels. Track your progress as
              you go.
            </p>
          </div>
          <div className="hp__assignment-grid">
            {SAMPLE_ASSIGNMENTS.map(({ id, title, difficulty, tag }) => (
              <div
                key={id}
                className={`hp__assignment-card hp__assignment-card--${difficulty.toLowerCase()}`}
              >
                <div className="hp__assignment-top">
                  <span className="hp__assignment-tag">{tag}</span>
                  <span
                    className={`hp__assignment-diff hp__assignment-diff--${difficulty.toLowerCase()}`}
                  >
                    {difficulty}
                  </span>
                </div>
                <h4 className="hp__assignment-title">{title}</h4>
                <div className="hp__assignment-arrow">
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
          <div className="hp__assignments-cta">
            {user ? (
              <Link to="/assignments" className="btn btn--primary btn--lg">
                View All Assignments <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                to="/signup"
                className="btn btn--primary btn--lg hp__cta-glow"
              >
                Start Learning Free <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER CTA ══ */}
      {!user && (
        <section className="hp__footer-cta">
          <div className="hp__footer-cta-glow" aria-hidden="true" />
          <div className="hp__section-inner hp__footer-cta-inner">
            <h2 className="hp__footer-cta-title">
              Ready to write your first{" "}
              <span className="hp__gradient-text">real query?</span>
            </h2>
            <p className="hp__footer-cta-sub">
              Free to use. No credit card required. Just sign up and start
              querying.
            </p>
            <Link
              to="/signup"
              className="btn btn--primary btn--lg hp__cta-glow"
            >
              <Play size={16} /> Get Started - It's Free{" "}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default HomePage;
