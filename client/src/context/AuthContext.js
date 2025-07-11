
import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
   
 
 const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
    
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    
  }
};
   const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
  }, []);


  const loadUser = useCallback(async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }
      setAuthToken(token);
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error loading user:', err);
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

 
const register = async (formData) => {
  try {
    setLoading(true);
    const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
      withCredentials: true
    });
    setToken(res.data.token);
    await loadUser();
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Registration failed' 
    };
  } finally {
    setLoading(false);
  }
};

const login = async (formData) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData, {
      withCredentials: true
    });
    
   
    await setAuthToken(res.data.token);
    
    
    await loadUser();
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Login failed' 
    };
  }
};

 

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token, loadUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };