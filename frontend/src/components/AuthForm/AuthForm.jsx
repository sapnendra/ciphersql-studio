import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Hexagon } from 'lucide-react';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './AuthForm.scss';

const AuthForm = ({ mode = 'login' }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await authAPI.login({ email: form.email, password: form.password });
      } else {
        res = await authAPI.signup(form);
      }

      login(res.data.user, res.data.token);
      toast.success(isLogin ? 'Welcome back!' : 'Account created!');
      navigate('/assignments');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      {/* Header */}
      <div className="auth-form__header">
        <div className="auth-form__logo">
          <Hexagon className="auth-form__logo-icon" size={28} strokeWidth={1.5} />
          <span className="auth-form__logo-text">
            Cipher<span className="auth-form__logo-accent">SQL</span>Studio
          </span>
        </div>
        <h1 className="auth-form__title">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="auth-form__subtitle">
          {isLogin
            ? 'Sign in to continue your SQL journey'
            : 'Start practicing SQL with real datasets'}
        </p>
      </div>

      {/* Form */}
      <form className="auth-form__body" onSubmit={handleSubmit} noValidate>
        {!isLogin && (
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              className="auth-form__input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="auth-form__input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            placeholder={isLogin ? '••••••••' : 'Minimum 6 characters'}
            className="auth-form__input"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className={`btn btn--primary btn--full${loading ? ' btn--loading' : ''}`}
          disabled={loading}
        >
          {!loading && (isLogin ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      {/* Footer */}
      <div className="auth-form__footer">
        {isLogin ? (
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/signup">Create one</Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
