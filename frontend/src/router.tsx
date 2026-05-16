import { createBrowserRouter, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import PlaygroundPage from './pages/PlaygroundPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './hooks/useAuth';
import { Spinner } from './components/ui/Spinner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-background"><Spinner size="lg" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-background"><Spinner size="lg" /></div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute><Landing /></PublicRoute>,
  },
  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/courses/:slug',
    element: <ProtectedRoute><CoursePage /></ProtectedRoute>,
  },
  {
    path: '/lessons/:id',
    element: <LessonPage />,
  },
  {
    path: '/playground',
    element: <ProtectedRoute><PlaygroundPage /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
