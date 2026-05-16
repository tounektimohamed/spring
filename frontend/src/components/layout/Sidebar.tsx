import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDashboard } from '../../hooks/useProgress';
import { Button } from '../ui/Button';

const navItems = [
  { path: '/dashboard', label: 'لوحة التحكم', icon: '📊' },
  { path: '/courses/phase-1-foundation', label: 'مسار التعلم', icon: '🛤️' },
  { path: '/playground', label: 'محرر الأكواد', icon: '💻' },
  { path: '/profile', label: 'الملف الشخصي', icon: '👤' },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { data: dash } = useDashboard();

  return (
    <aside className="w-64 h-screen bg-surface border-l border-border flex flex-col fixed right-0 top-0 z-40">
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="text-2xl font-display font-bold text-primary">
          SpringPath
        </Link>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.displayName?.charAt(0) || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.displayName}</p>
            <p className="text-xs text-textMuted">
              {dash?.totalXp || 0} XP
              {dash && dash.currentStreak > 0 && (
                <span className="ml-2">🔥 {dash.currentStreak}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-card text-sm transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-textMuted hover:text-textPrimary hover:bg-surfaceHigh'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
          🚪 تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
}
