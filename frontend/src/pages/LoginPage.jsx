import AuthForm from '../components/AuthForm/AuthForm';
import useMeta from '../hooks/useMeta';

const LoginPage = () => {
  useMeta({
    title: 'Sign In',
    description: 'Sign in to CipherSQL Studio and continue your SQL learning journey with live PostgreSQL assignments.',
  });

  return (
    <div className="auth-layout">
      <AuthForm mode="login" />
    </div>
  );
};

export default LoginPage;
