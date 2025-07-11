import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const result = await login(formData);
    if (result.success) {
      navigate('/'); 
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm type="login" onSubmit={handleLogin} error={error} />
      <p>
        Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
      </p>
    </div>
  );
};

export default Login;