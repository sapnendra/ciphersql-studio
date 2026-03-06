import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Hexagon, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <Hexagon className="navbar__logo-icon" size={22} strokeWidth={1.5} />
          <span className="navbar__logo-text">
            Cipher<span className="navbar__logo-accent">SQL</span>Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar__links">
          {user && (
            <NavLink
              to="/assignments"
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              Assignments
            </NavLink>
          )}
        </div>

        {/* User Section */}
        <div className="navbar__user">
          {user ? (
            <>
              <span className="navbar__user-name">{user.name}</span>
              <button
                className="btn btn--secondary btn--sm"
                onClick={handleLogout}
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--sm">
                <LogIn size={14} />
                Login
              </Link>
              <Link to="/signup" className="btn btn--primary btn--sm">
                <UserPlus size={14} />
                Sign Up
              </Link>
            </>
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {user && (
            <NavLink
              to="/assignments"
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Assignments
            </NavLink>
          )}
          {user ? (
            <>
              <span className="navbar__mobile-user">{user.name}</span>
              <button className="btn btn--secondary btn--full" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn--ghost btn--full"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn--primary btn--full"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
