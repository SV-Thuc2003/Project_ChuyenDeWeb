import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { token, userId, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!token || !userId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
