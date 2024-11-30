import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userApi } from '../store/user/userApi'; // Import the userApi
import auth from '../utils/auth'; // Utility to handle localStorage tokens

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi
      .getMe()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Authentication failed:', error);

        // Clear invalid tokens
        auth.clearToken();

        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
