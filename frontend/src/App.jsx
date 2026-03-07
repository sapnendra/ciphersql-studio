import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AssignmentsPage from './pages/AssignmentsPage';
import WorkspacePage from './pages/WorkspacePage';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="workspace-loading"><div className="workspace-loading__spinner" /></div>;
  return user ? children : <Navigate to="/login" replace />;
};

// Public-only route: redirect logged-in users
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return !user ? children : <Navigate to="/assignments" replace />;
};

const AppRoutes = () => {
  const location = useLocation();
  const isWorkspace = /^\/assignments\/[^/]+/.test(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login"  element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/assignments" element={<ProtectedRoute><AssignmentsPage /></ProtectedRoute>} />
        <Route path="/assignments/:id" element={<ProtectedRoute><WorkspacePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isWorkspace && <Footer />}
    </>
  );
};

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const handleLoadDone = useCallback(() => setShowLoading(false), []);

  return (
    <AuthProvider>
      {showLoading && <LoadingScreen onDone={handleLoadDone} />}
      {!showLoading && <BrowserRouter><AppRoutes /></BrowserRouter>}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#F8FAFC',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          },
          success: { iconTheme: { primary: '#22C55E', secondary: '#0B0F1A' } },
          error:   { iconTheme: { primary: '#EF4444', secondary: '#0B0F1A' } },
        }}
      />
    </AuthProvider>
  );
};

export default App;
