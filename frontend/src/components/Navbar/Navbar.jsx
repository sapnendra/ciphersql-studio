import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Database, LogOut, LogIn, UserPlus, Menu, X, BookOpen, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="footer__logo">
          <Database size={18} />
          <span>Cipher<span className="footer__logo-accent">SQL</span>Studio</span>
        </Link>

        {/* Center Nav Links */}
        <div className="navbar__links">
          {user && (
            <NavLink
              to="/assignments"
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              <BookOpen size={14} />
              Assignments
            </NavLink>
          )}
        </div>

        {/* Right Section */}
        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user">
              <div className="navbar__user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="navbar__user-name">{user.name}</span>
              <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="btn btn--ghost btn--sm">
                <LogIn size={14} />
                Login
              </Link>
              <Link to="/signup" className="btn btn--primary btn--sm navbar__cta">
                <UserPlus size={14} />
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="navbar__mobile">
          {user ? (
            <>
              <div className="navbar__mobile-user">
                <div className="navbar__user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <span>{user.name}</span>
              </div>
              <NavLink to="/assignments" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                <BookOpen size={15} /> Assignments
              </NavLink>
              <button className="btn btn--secondary btn--full" onClick={handleLogout}>
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <span className="navbar__mobile-link navbar__mobile-link--ghost"><BookOpen size={15} /> Docs</span>
              <span className="navbar__mobile-link navbar__mobile-link--ghost"><Zap size={15} /> Resources</span>
              <Link to="/login" className="btn btn--ghost btn--full" onClick={() => setMenuOpen(false)}>
                <LogIn size={14} /> Login
              </Link>
              <Link to="/signup" className="btn btn--primary btn--full" onClick={() => setMenuOpen(false)}>
                <UserPlus size={14} /> Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
