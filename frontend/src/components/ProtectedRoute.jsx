import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;
  if (isAdmin && role !== 'admin') return <Navigate to="/" />;

  return children;
};