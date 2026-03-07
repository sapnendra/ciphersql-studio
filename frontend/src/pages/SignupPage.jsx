import AuthForm from '../components/AuthForm/AuthForm';
import useMeta from '../hooks/useMeta';

const SignupPage = () => {
  useMeta({
    title: 'Create Account',
    description: 'Create your free CipherSQL Studio account. Access 30+ SQL assignments, live PostgreSQL sandbox, and AI-powered hints.',
  });

  return (
    <div className="auth-layout">
      <AuthForm mode="signup" />
    </div>
  );
};

export default SignupPage;
