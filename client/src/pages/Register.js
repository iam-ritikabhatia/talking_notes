
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();


const handleRegister = async (formData) => {
  const result = await register(formData);
  if (result.success) {
    navigate('/'); 
  } else {
    setError(result.error);
  }
};

  return (
    <div className="auth-page">
      <AuthForm type="register" onSubmit={handleRegister} error={error} />
      <p>
        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default Register;