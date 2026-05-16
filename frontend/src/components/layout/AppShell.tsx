import { type ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: ReactNode;
  sidebar?: boolean;
}

export function AppShell({ children, sidebar = true }: AppShellProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {sidebar && <Sidebar />}
      <main className={sidebar ? 'mr-64' : ''}>
        {children}
      </main>
    </div>
  );
}
