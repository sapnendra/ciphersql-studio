import { Link } from 'react-router-dom';
import { Database, ExternalLink, Github } from 'lucide-react';
import './Footer.scss';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">

      {/* Brand column */}
      <div className="footer__brand">
        <Link to="/" className="footer__logo">
          <Database size={18} />
          <span>Cipher<span className="footer__logo-accent">SQL</span>Studio</span>
        </Link>
        <p className="footer__tagline">
          Learn SQL by writing real queries against a live PostgreSQL sandbox.
          30+ assignments, AI hints, and zero setup required.
        </p>
        <a
          href="https://github.com/sapnendra/ciphersql-studio"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__github"
          aria-label="GitHub"
        >
          <Github size={16} />
          <span>Open Source</span>
        </a>
      </div>

      {/* Platform links */}
      <div className="footer__col">
        <h4 className="footer__col-title">Platform</h4>
        <Link to="/"           className="footer__link">Home</Link>
        <Link to="/assignments" className="footer__link">Assignments</Link>
        <Link to="/login"      className="footer__link">Login</Link>
        <Link to="/signup"     className="footer__link">Get Started</Link>
      </div>

      {/* Learn SQL resources */}
      <div className="footer__col">
        <h4 className="footer__col-title">Learn SQL</h4>
        <a href="https://www.postgresql.org/docs/" target="_blank" rel="noopener noreferrer" className="footer__link footer__link--ext">
          PostgreSQL Docs <ExternalLink size={10} />
        </a>
        <a href="https://sqltutorial.org/" target="_blank" rel="noopener noreferrer" className="footer__link footer__link--ext">
          SQL Tutorial <ExternalLink size={10} />
        </a>
        <a href="https://use-the-index-luke.com/" target="_blank" rel="noopener noreferrer" className="footer__link footer__link--ext">
          Indexing Guide <ExternalLink size={10} />
        </a>
        <a href="https://explain.depesz.com/" target="_blank" rel="noopener noreferrer" className="footer__link footer__link--ext">
          Query Explainer <ExternalLink size={10} />
        </a>
      </div>

      {/* Tech stack */}
      <div className="footer__col">
        <h4 className="footer__col-title">Built With</h4>
        <span className="footer__tech">PostgreSQL</span>
        <span className="footer__tech">React 18</span>
        <span className="footer__tech">Node.js</span>
        <span className="footer__tech">Monaco Editor</span>
        <span className="footer__tech">OpenAI</span>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="footer__bottom">
      <p className="footer__copy">
        © {CURRENT_YEAR} CipherSQL Studio. Made for developers learning SQL.
      </p>
      <a
        href="https://github.com/sapnendra"
        target="_blank"
        rel="noopener noreferrer"
        className="footer__credit"
      >
        <Github size={13} />
        Designed &amp; Developed by Sapnendra
      </a>
      <div className="footer__bottom-badges">
        <span className="footer__badge">PostgreSQL</span>
        <span className="footer__badge">REST API</span>
        <span className="footer__badge">JWT Auth</span>
      </div>
    </div>
  </footer>
);

export default Footer;
