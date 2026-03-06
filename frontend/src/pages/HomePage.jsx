import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BookOpen, Lightbulb, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './HomePage.scss';

const FEATURES = [
  { Icon: Zap,         title: 'Live SQL Execution', desc: 'Run queries instantly against real sandboxed PostgreSQL databases.' },
  { Icon: BookOpen,    title: '30+ Assignments',    desc: 'Curated exercises from beginner SELECT to advanced JOINs and aggregations.' },
  { Icon: Lightbulb,  title: 'AI Hints',           desc: 'Get contextual hints powered by AI without getting handed the answer.' },
  { Icon: ShieldCheck, title: 'Safe Sandbox',       desc: 'Isolated per-user schemas prevent any accidental data modification.' },
];

const HomePage = () => {
  const { user } = useAuth();

  return (
    <main className="home-page">
      <div className="home-page__hero">
        <div className="home-page__hero-badge">SQL Learning Sandbox</div>
        <h1 className="home-page__hero-title">
          Master SQL with{' '}
          <span className="home-page__hero-accent">Real Practice</span>
        </h1>
        <p className="home-page__hero-subtitle">
          Write, execute, and debug SQL queries against pre-configured datasets.
          Get AI hints when stuck. Build real skills.
        </p>
        <div className="home-page__hero-actions">
          {user ? (
            <Link to="/assignments" className="btn btn--primary btn--lg">
              Browse Assignments <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn btn--primary btn--lg">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn--secondary btn--lg">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="home-page__features">
        {FEATURES.map(({ Icon, title, desc }) => (
          <div key={title} className="home-page__feature-card">
            <span className="home-page__feature-icon">
              <Icon size={24} strokeWidth={1.5} />
            </span>
            <h3 className="home-page__feature-title">{title}</h3>
            <p className="home-page__feature-desc">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
